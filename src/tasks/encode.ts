import { BasePayloadInput, EncodeInput, Payload } from 'interfaces/payload';
import { getBasePayload, loadPlainIntoDocument } from './helper';
import { DocumentArray, NDArray } from 'interfaces/docarray';
import { fetch } from 'undici';

export async function encode(encodeInput: EncodeInput, basePaylaodInput: BasePayloadInput): Promise<NDArray> {
    const payload = await getEncodePayload(encodeInput, basePaylaodInput);
    const result = await fetch(basePaylaodInput.endpoint + '/post', {
        method: 'POST',
        headers: payload.headers,
        body: JSON.stringify(payload.body),
    });
    return await unboxEncodeResult(await result.json());
}

async function getEncodePayload(encodeInput: EncodeInput, basePayloadInput: BasePayloadInput): Promise<Payload> {
    const payload = getBasePayload(encodeInput, basePayloadInput);
    payload.body.exec_endpoint = '/encode';

    let doc;
    if (encodeInput.text) {
        doc = await loadPlainIntoDocument(encodeInput.text, 'text');
    } else if (encodeInput.image) {
        doc = await loadPlainIntoDocument(encodeInput.image, 'image');
    } else {
        throw new Error('Please provide either text or image to encode.');
    }
    payload.body.data = [doc] as DocumentArray;
    return payload;
}

async function unboxEncodeResult(result: any): Promise<NDArray> {
    return result.data[0].embedding;
}
