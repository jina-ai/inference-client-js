import { DocumentArray, NDArray } from "./docarray";

export interface Parameters {
    drop_image_content?: boolean;
}

export interface CaptionParameters extends Parameters {
    // num_captions?: number; // reserved for future use
}
export interface EncodeParameters extends Parameters {}

export interface AllParameters extends CaptionParameters, EncodeParameters {}

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
