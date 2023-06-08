import { getBasePayload, loadPlainIntoDocument } from "./helper";
import { CaptionInput } from "interfaces/payload";
import { DocumentArray } from "interfaces/docarray";

export async function caption(captionInput: CaptionInput): Promise<any> {
    console.log('caption');
    console.log(captionInput);

    let [payload, contentType] = await getCaptionPayload(captionInput);
    payload;
    contentType;
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