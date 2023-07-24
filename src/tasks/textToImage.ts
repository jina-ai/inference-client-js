import { Document, DocumentArray } from '../interfaces/docarray';
import { BasePayloadInput, Payload, TextToImageInput } from '../interfaces/payload';
import { getBasePayload, loadPlainIntoDocument } from './helper';

export async function textToImage(
    textToImageInput: TextToImageInput,
    basePaylaodInput: BasePayloadInput
): Promise<any> {
    const payload = await getTextToImagePayload(textToImageInput, basePaylaodInput);
    const result = await fetch(basePaylaodInput.endpoint + '/post', {
        method: 'POST',
        headers: payload.headers,
        body: JSON.stringify(payload.body),
    });
    return await unboxTextToImageResult(await result.json());
}

async function getTextToImagePayload(
    textToImageInput: TextToImageInput,
    basePaylaodInput: BasePayloadInput
): Promise<Payload> {
    const payload = getBasePayload(textToImageInput, basePaylaodInput);
    payload.body.exec_endpoint = '/text_to_image';

    const doc = (await loadPlainIntoDocument('', 'empty')) as Document;
    doc.tags = { prompt: textToImageInput.prompt, negative_prompt: textToImageInput.negative_prompt };
    payload.body.data = [doc] as DocumentArray;
    return payload;
}

async function unboxTextToImageResult(result: any): Promise<any> {
    const output = [];
    for (const match of result.data[0].matches) {
        output.push(match.blob ?? match.tensor ?? undefined);
    }
    return output;
}
