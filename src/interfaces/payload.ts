import { DocumentArray, NDArray } from './docarray';

export interface Parameters {
    drop_image_content?: boolean;
}

export type CaptionParameters = Parameters;

export type EncodeParameters = Parameters;

export type RankParameters = Parameters;

export interface TextToImageParameters extends Parameters {
    height?: number;
    width?: number;
    num_inference_steps?: number;
    guidance_scale?: number;
    num_images_per_prompt?: number;
    eta?: number;
    latents?: NDArray;
    output_type?: 'pil' | 'latent';
    return_dict?: boolean;
    cross_attention_kwargs?: { [k: string]: any };
    guidance_rescale?: number;
    original_size?: number[];
    crops_coords_top_left?: number[];
    target_size?: number[];
}

export interface UpscaleParameters extends Parameters {
    scale?: string;
    image_format?: 'png' | 'jpeg';
    output_path?: string;
    quality?: number;
}

export type VqaParameters = Parameters;

export interface AllParameters
    extends CaptionParameters,
        EncodeParameters,
        RankParameters,
        TextToImageParameters,
        UpscaleParameters,
        VqaParameters {}

export interface BasePayloadInput {
    endpoint: string;
    token?: string;
}

export interface CaptionInput extends CaptionParameters {
    image: NDArray | string;
}

export interface EncodeInput extends EncodeParameters {
    text?: string;
    image?: NDArray | string;
}

export interface RankInput extends RankParameters {
    text?: string;
    image?: NDArray | string;
    text_candidates?: string[];
    image_candidates?: NDArray[] | string[];
}

export interface TextToImageInput extends TextToImageParameters {
    prompt: string;
    negative_prompt?: string;
}

export interface UpscaleInput extends UpscaleParameters {
    image: NDArray | string;
}

export interface VqaInput extends VqaParameters {
    image: NDArray | string;
    question: string;
}

export interface Payload {
    headers: {
        'Content-Type'?: string;
        Authorization?: string;
    };
    body: {
        data?: DocumentArray;
        parameters?: AllParameters;
        exec_endpoint?: string;
    };
}
