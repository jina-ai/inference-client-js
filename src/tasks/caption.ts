import { getBasePayload, loadPlainIntoDocument } from "./helper";
import { AllParameters, BasePayloadInput, CaptionInput, Payload } from "interfaces/payload";
import { DocumentArray } from "interfaces/docarray";
import { fetch } from 'undici';


export async function caption(captionInput: CaptionInput, basePayloadInput: BasePayloadInput): Promise<any> {
    const payload = await getCaptionPayload(captionInput, basePayloadInput);
    let result = await fetch(basePayloadInput.endpoint + '/post', {method: 'POST', headers: payload.headers, body: JSON.stringify(payload.body)})
    return await unboxCaptionResult(await result.json());
}


async function getCaptionPayload(captionInput: CaptionInput, basePayloadInput: BasePayloadInput): Promise<Payload> {
    const payload = getBasePayload(captionInput.parameters as AllParameters, basePayloadInput);
    payload.body.exec_endpoint = '/caption';

        let imageDoc = await loadPlainIntoDocument(captionInput.image, "image");
        payload.body.data = [imageDoc] as DocumentArray;

    return payload
}

async function unboxCaptionResult(result: any): Promise<object | string> {
    return result.data[0].tags.response;
}