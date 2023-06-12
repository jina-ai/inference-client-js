import { Document, DocumentArray, NDArray } from 'interfaces/docarray';
import { BasePayloadInput, Payload, RankInput } from 'interfaces/payload';
import { getBasePayload, loadPlainIntoDocument } from './helper';
import { fetch } from 'undici';

export async function rank(rankInput: RankInput, basePayloadInput: BasePayloadInput): Promise<NDArray[] | string[]> {
    const [payload, candidatesType] = await getRankPayload(rankInput, basePayloadInput);
    const result = await fetch(basePayloadInput.endpoint + '/post', {
        method: 'POST',
        headers: payload.headers,
        body: JSON.stringify(payload.body),
    });
    return await unboxRankResult(await result.json(), candidatesType);
}

async function getRankPayload(rankInput: RankInput, basePayloadInput: BasePayloadInput): Promise<[Payload, string]> {
    const payload = getBasePayload(rankInput, basePayloadInput);
    payload.body.exec_endpoint = '/rank';

    let doc: Document;
    if (rankInput.text && !rankInput.image) {
        doc = (await loadPlainIntoDocument(rankInput.text, 'text')) as Document;
    } else if (rankInput.image && !rankInput.text) {
        doc = (await loadPlainIntoDocument(rankInput.image, 'image')) as Document;
    } else if (rankInput.image && rankInput.text) {
        throw new Error('Multi-modal input not supported. Please provide only text or image input.');
    } else {
        throw new Error('Please provide either text or image to rank.');
    }

    const candidatesDocs = [] as Document[];
    let candidatesType: string;

    if (rankInput.text_candidates && !rankInput.image_candidates) {
        candidatesType = 'text';
        for (const candidate of rankInput.text_candidates) {
            candidatesDocs.push((await loadPlainIntoDocument(candidate, 'text')) as Document);
        }
    } else if (rankInput.image_candidates && !rankInput.text_candidates) {
        candidatesType = 'image';
        for (const candidate of rankInput.image_candidates) {
            candidatesDocs.push((await loadPlainIntoDocument(candidate, 'image')) as Document);
        }
    } else if (rankInput.image_candidates && rankInput.text_candidates) {
        throw new Error('Multi-modal input not supported. Please provide only text or image candidates.');
    } else {
        throw new Error('Please provide either text or image candidates to rank.');
    }

    doc.matches = candidatesDocs as Document[];
    payload.body.data = [doc] as DocumentArray;
    return [payload, candidatesType];
}

async function unboxRankResult(result: any, candidatesType: string): Promise<NDArray[] | string[]> {
    const output = [];
    for (const match of result.data[0].matches) {
        if (candidatesType === 'text') {
            output.push(match.text);
        } else {
            output.push(match.uri ?? match.blob ?? undefined);
        }
    }
    return output;
}
