import { Document, DocumentArray, NDArray } from '../interfaces/docarray';
import { randomUUID } from 'crypto';
import { BasePayloadInput, Payload, TextToImageInput, TextToImageParameters } from '../interfaces/payload';
import { getBasePayload } from './helper';

export async function textToImage(
    textToImageInput: TextToImageInput,
    basePayloadInput: BasePayloadInput
): Promise<NDArray | NDArray[] | string | string[]> {
    const payload = await getTextToImagePayload(textToImageInput, basePayloadInput);
    const result = await fetch(basePayloadInput.endpoint + '/post', {
        method: 'POST',
        headers: payload.headers,
        body: JSON.stringify(payload.body),
    });
    return await unboxTextToImageResult(await result.json());
}

async function getTextToImagePayload(
    textToImageInput: TextToImageInput,
    basePayloadInput: BasePayloadInput
): Promise<Payload> {
    const payload = getBasePayload(textToImageInput, basePayloadInput);
    payload.body.exec_endpoint = '/text-to-image';

    const doc = { id: randomUUID() } as Document;
    doc.tags = { prompt: textToImageInput.prompt, negative_prompt: textToImageInput.negative_prompt };
    payload.body.data = [doc] as DocumentArray;

    const parameterTemplate = {
        height: undefined,
        width: undefined,
        num_inference_steps: undefined,
        guidance_scale: undefined,
        num_images_per_prompt: undefined,
        eta: undefined,
        latents: undefined,
        output_type: undefined,
        return_dict: undefined,
        cross_attention_kwargs: undefined,
        guidance_rescale: undefined,
        original_size: undefined,
        crops_coords_top_left: undefined,
        target_size: undefined,
    } as TextToImageParameters;

    Object.keys(parameterTemplate).forEach((key) => {
        if (textToImageInput[key as keyof TextToImageParameters]) {
            payload.body.parameters = {
                ...payload.body.parameters,
                [key]: textToImageInput[key as keyof TextToImageParameters],
            };
        }
    });
    return payload;
}

async function unboxTextToImageResult(result: any): Promise<NDArray | NDArray[] | string | string[]> {
    const output = [];
    for (const match of result.data[0].matches) {
        output.push(match.blob ?? match.tensor ?? undefined);
    }
    if (output.length === 1) {
        return output[0];
    }
    return output;
}
