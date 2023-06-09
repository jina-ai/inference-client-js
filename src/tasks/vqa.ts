import { Document, DocumentArray } from "interfaces/docarray";
import { AllParameters, BasePayloadInput, Payload, VqaInput } from "interfaces/payload";
import { getBasePayload, loadPlainIntoDocument } from "./helper";
import { fetch } from 'undici';


export async function vqa(vqaInput: VqaInput, basePaylaodInput: BasePayloadInput): Promise<string> {
    const payload = await getVqaPayload(vqaInput, basePaylaodInput);
    const result = await fetch(basePaylaodInput.endpoint + '/post', {method: 'POST', headers: payload.headers, body: JSON.stringify(payload.body)})
    return await unboxVqaResult(await result.json());
}


async function getVqaPayload(vqaInput: VqaInput, basePaylaodInput: BasePayloadInput): Promise<Payload> {
    const payload = getBasePayload(vqaInput.parameters as AllParameters, basePaylaodInput);
    payload.body.exec_endpoint = '/vqa';

    const doc = await loadPlainIntoDocument(vqaInput.image, "image") as Document;
    doc.tags = {prompt: vqaInput.question};
    payload.body.data = [doc] as DocumentArray;
    return payload;
}


async function unboxVqaResult(result: any): Promise<string> {
    return result.data[0].tags.response;
}