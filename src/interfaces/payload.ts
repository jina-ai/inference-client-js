import { DocumentArray, NDArray } from "./docarray";

export interface Parameters {
    drop_image_content?: boolean;
}

export interface BasePayloadInput {
    endpoint: string;
    token?: string;
}

export interface BaseUserInput {
    parameters?: Parameters;
    request_size?: number;
}

export interface CaptionInput extends BaseUserInput {
    image?: NDArray | string;
    docs?: DocumentArray;
}

export interface EncodeInput extends BaseUserInput {
    text?: string;
    image?: NDArray | string;
    docs?: DocumentArray;
}

export interface Payload {
    headers: {
        'Content-Type'?: string;
        Authorization?: string;
    }
    body: {
        data?: DocumentArray;
        parameters?: Parameters;
        exec_endpoint?: string;
    }
}
