import { DocumentArray, NDArray } from "./docarray";

export interface Parameters {
    drop_image_content?: boolean;
}

export interface CaptionParameters extends Parameters {
    // num_captions?: number; // reserved for future use
}
export interface EncodeParameters extends Parameters {}

export interface RankParameters extends Parameters {}

export interface UpscaleParameters extends Parameters {
    scale?: string;
    image_format?: 'png' | 'jpeg';
    output_path?: string;
}

export interface VqaParameters extends Parameters {}

export interface AllParameters extends CaptionParameters, EncodeParameters, RankParameters, VqaParameters {}

export interface BasePayloadInput {
    endpoint: string;
    token?: string;
}

export interface CaptionInput {
    image: NDArray | string;
    parameters?: CaptionParameters;
}

export interface EncodeInput {
    text?: string;
    image?: NDArray | string;
    parameters?: EncodeParameters;
}

export interface RankInput {
    text?: string;
    image?: NDArray | string;
    candidates: NDArray[] | string[];
    candidates_type: 'text' | 'image';
    parameters?: RankParameters;
}

export interface UpscaleInput {
    image: NDArray | string;
    parameters?: UpscaleParameters;
}

export interface VqaInput {
    image: NDArray | string;
    question: string;
    parameters?: VqaParameters;
}

export interface Payload {
    headers: {
        'Content-Type'?: string;
        Authorization?: string;
    }
    body: {
        data?: DocumentArray;
        parameters?: AllParameters;
        exec_endpoint?: string;
    }
}
