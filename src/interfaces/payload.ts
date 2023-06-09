import { DocumentArray, NDArray } from "./docarray";

export interface Parameters {
    drop_image_content?: boolean;
}

export interface CaptionParameters extends Parameters {
    // num_captions?: number; // reserved for future use
}
export interface EncodeParameters extends Parameters {}

export interface RankParameters extends Parameters {}

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
