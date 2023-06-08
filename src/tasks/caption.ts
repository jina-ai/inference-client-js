import { getBasePayload, loadPlainIntoDocument } from "./helper";
import { BasePayloadInput, BaseUserInput, CaptionInput, Payload } from "interfaces/payload";
import { DocumentArray } from "interfaces/docarray";
import { fetch } from 'undici';


export async function caption(captionInput: CaptionInput, basePayloadInput: BasePayloadInput): Promise<any> {
    const [payload, contentType] = await getCaptionPayload(captionInput, basePayloadInput);
    let result = await fetch(basePayloadInput.endpoint + '/post', {method: 'POST', headers: payload.headers, body: JSON.stringify(payload.body)})
    return await unboxCaptionResult(await result.json(), contentType);
}


async function getCaptionPayload(captionInput: CaptionInput, basePayloadInput: BasePayloadInput): Promise<[Payload, string]> {
    const payload = getBasePayload(captionInput as BaseUserInput, basePayloadInput);
    payload.body.exec_endpoint = '/caption';

    let contentType;
    if (captionInput.docs) {
        if (captionInput.image) {
            throw new Error('More than one input type provided. Please provide only docs or image input.')
        }
        contentType = 'docarray';
        payload.body.data = captionInput.docs;
    }
    else if (captionInput.image) {
        contentType = 'plain';
        let imageDoc = await loadPlainIntoDocument(captionInput.image, "image");
        payload.body.data = [imageDoc] as DocumentArray;
    }
    else {
        throw new Error('Please provide either image or docs input.');
    }
    return [payload, contentType];
}

async function unboxCaptionResult(result: any, contentType: string): Promise<object | string> {
    if (contentType === 'plain') {
        return result.data[0].tags.response;
    }
    else {
        return result.data;
    }
}