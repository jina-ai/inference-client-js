import { Document, DocumentArray, NDArray } from 'interfaces/docarray';
import { BasePayloadInput, Payload, UpscaleInput } from 'interfaces/payload';
import { getBasePayload, loadPlainIntoDocument } from './helper';
import { fetch } from 'undici';

export async function upscale(
    upscaleInput: UpscaleInput,
    basePaylaodInput: BasePayloadInput
): Promise<NDArray | string> {
    const payload = await getUpscalePayload(upscaleInput, basePaylaodInput);
    const result = await fetch(basePaylaodInput.endpoint + '/post', {
        method: 'POST',
        headers: payload.headers,
        body: JSON.stringify(payload.body),
    });
    return await unboxUpscaleResult(await result.json());
}

async function getUpscalePayload(upscaleInput: UpscaleInput, basePayloadInput: BasePayloadInput): Promise<Payload> {
    const payload = getBasePayload(upscaleInput, basePayloadInput);
    payload.body.exec_endpoint = '/upscale';

    const doc = (await loadPlainIntoDocument(upscaleInput.image, 'image')) as Document;
    const image_format = upscaleInput.image_format;
    if (image_format) {
        doc.tags = { image_format: image_format };
    }

    const output_path = upscaleInput.output_path;
    if (output_path) {
        doc.tags = { output_path: output_path };
    }
    payload.body.data = [doc] as DocumentArray;
    return payload;
}

async function unboxUpscaleResult(result: any): Promise<NDArray | string> {
    return result.data[0].blob;
}
