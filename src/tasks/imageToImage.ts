import { Document, DocumentArray, NDArray } from '../interfaces/docarray';
import { BasePayloadInput, Payload, ImageToImageInput, ImageToImageParameters } from '../interfaces/payload';
import { getBasePayload, loadPlainIntoDocument } from './helper';

export async function imageToImage(
    imageToImageInput: ImageToImageInput,
    basePayloadInput: BasePayloadInput
): Promise<NDArray | NDArray[] | string | string[]> {
    const payload = await getImageToImagePayload(imageToImageInput, basePayloadInput);
    const result = await fetch(basePayloadInput.endpoint + '/post', {
        method: 'POST',
        headers: payload.headers,
        body: JSON.stringify(payload.body),
    });
    return await unboxImageToImageResult(await result.json());
}

async function getImageToImagePayload(
    imageToImageInput: ImageToImageInput,
    basePayloadInput: BasePayloadInput
): Promise<Payload> {
    const payload = getBasePayload(imageToImageInput, basePayloadInput);
    payload.body.exec_endpoint = '/image-to-image';

    const doc = (await loadPlainIntoDocument(imageToImageInput.image, 'image')) as Document;
    doc.tags = { prompt: imageToImageInput.prompt, negative_prompt: imageToImageInput.negative_prompt };
    payload.body.data = [doc] as DocumentArray;

    const parameterTemplate = {
        strength: undefined,
        num_inference_steps: undefined,
        guidance_scale: undefined,
        num_images_per_prompt: undefined,
        eta: undefined,
        output_type: undefined,
        return_dict: undefined,
        cross_attention_kwargs: undefined,
        guidance_rescale: undefined,
        original_size: undefined,
        crops_coords_top_left: undefined,
        target_size: undefined,
        aesthetic_score: undefined,
        negative_aesthetic_score: undefined,
    } as ImageToImageParameters;

    Object.keys(parameterTemplate).forEach((key) => {
        if (imageToImageInput[key as keyof ImageToImageParameters]) {
            payload.body.parameters = {
                ...payload.body.parameters,
                [key]: imageToImageInput[key as keyof ImageToImageParameters],
            };
        }
    });
    return payload;
}

async function unboxImageToImageResult(result: any): Promise<NDArray | NDArray[] | string | string[]> {
    const output = [];
    for (const match of result.data[0].matches) {
        output.push(match.blob ?? match.tensor ?? undefined);
    }
    if (output.length === 1) {
        return output[0];
    }
    return output;
}
