import { getBasePayload, loadPlainIntoDocument } from "./helper";
import { CaptionInput } from "interfaces/payload";

export async function caption(...args: { [key: string]: any }[]): Promise<void> {
    console.log('caption');
    // console.log(host);
    // console.log(token);
    // console.log(args);
    // console.log(args[0]);
    // console.log(args[0].input)
    let [payload, contentType] = await getCaptionPayload({ image: args[0].input.toString(), endpoint: args[0].endpoint, token: args[0].token });
    payload;
    contentType;
}

export function caption_test(input: CaptionInput): void {
    console.log('caption_input');
    input;
    // console.log(input);
    // console.log(input.image);
    // console.log(input.docs);
    // console.log(input.parameters);
    // console.log(input.request_size);
    console.log('caption_input');
}

async function getCaptionPayload(captionInput: CaptionInput): Promise<[any, any]> {
    console.log('get_caption_payload');
    // console.log(args);
    // console.log(args[0]);
    // console.log(args[0].input)

    const payload = getBasePayload(captionInput);
    payload.body.exec_endpoint = '/caption';

    console.log();
    console.log(53535353);
    console.log(payload);
    console.log(35353535);
    console.log();


    let contentType: string = '';

    if (captionInput.docs) {
        if (captionInput.image) {
            throw new Error('More than one input type provided. Please provide only docs or image input.')
        }
        contentType = 'docarray';
        payload.body.data = captionInput.docs;
    }
    else if (captionInput.image) {
        contentType = 'plain';
        let doc = await loadPlainIntoDocument(captionInput.image, "image");
        console.log(doc);


    }

    contentType;


    return [payload, contentType];
}