import { BaseUserInput, BasePayloadInput, Payload } from "../interfaces/payload";
import { Document, NDArray } from "../interfaces/docarray"
import { randomUUID } from 'crypto';
import fs from 'fs';
import { fetch } from 'undici';

async function loadImageBase64(url: string): Promise<string> {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    const bytes = new Uint8Array(arrayBuffer);
    const base64 = btoa(String.fromCharCode(...bytes));
    return base64;
}


async function loadPlainIntoImageDocument(content: NDArray | string): Promise<Document> {
    let blob;
    try {
        if (fs.existsSync(content as string)) {
            blob = fs.readFileSync(content as string, 'base64');
        }
        else {
            blob = await loadImageBase64(content as string);
        }
        return { id: randomUUID(), blob: blob, uri: content as string };
    }
    catch (err) {
        blob = content;
        return { id: randomUUID(), blob: blob}
    }
}


export async function loadPlainIntoDocument(content: NDArray | string, mimeType?: string): Promise<Document | void> {
    if (mimeType === 'image') {
        try {
            return await loadPlainIntoImageDocument(content);
        }
        catch (err) {
            console.log(err);
        }
    }
    else if (mimeType === 'text') {
        return { id: randomUUID(), text: content as string };
    }
    if (!mimeType) {
        try {
            return await loadPlainIntoImageDocument(content as string);
        }
        catch (err) {
            return { id: randomUUID(), text: content as string };
        }
    }
}


export function getBasePayload(baseUserInput: BaseUserInput, basePayloadInput: BasePayloadInput): Payload {
    baseUserInput.parameters = baseUserInput.parameters ?? {};
    baseUserInput.parameters.drop_image_content = baseUserInput.parameters.drop_image_content ?? true;

    const payload: Payload = {} as Payload;
    const headers = { 'Content-Type': 'application/json', 'Authorization': basePayloadInput.token };
    const body = { parameters: baseUserInput.parameters };
    payload.headers = headers;
    payload.body = body;
    return payload
}