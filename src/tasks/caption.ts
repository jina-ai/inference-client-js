import { getBasePayload, loadPlainIntoDocument } from "./helper";
import { CaptionInput } from "interfaces/payload";
import { DocumentArray } from "interfaces/docarray";
import { fetch } from 'undici';


export async function caption(captionInput: CaptionInput): Promise<any> {
    console.log('caption');
    console.log(captionInput);

    let [payload, contentType] = await getCaptionPayload(captionInput);
    payload;
    contentType;

    let result = await fetch(captionInput.endpoint+'/post', {method: 'POST', headers: payload.headers, body: JSON.stringify(payload.body)})

    console.log()
    console.log('result')
    const tmp = await result.json() as any
    console.log(tmp.data[0].tags)
    console.log()
}

async function getCaptionPayload(captionInput: CaptionInput): Promise<[any, any]> {
    const payload = getBasePayload(captionInput);
    payload.body.exec_endpoint = '/caption';

    console.log();
    console.log('get_caption_payload');
    console.log(payload);
    console.log();


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
    console.log('data')
    console.log(payload)
    console.log()
    console.log('datadata')
    console.log(payload.body.data)

    return [payload, contentType];
}