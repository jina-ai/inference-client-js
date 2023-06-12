import { Document, DocumentArray, NDArray } from 'interfaces/docarray';
import { AllParameters, BasePayloadInput, Payload, RankInput } from 'interfaces/payload';
import { getBasePayload, loadPlainIntoDocument } from './helper';
import { fetch } from 'undici';

export async function rank(rankInput: RankInput, basePayloadInput: BasePayloadInput): Promise<NDArray[] | string[]> {
    const payload = await getRankPayload(rankInput, basePayloadInput);
    const result = await fetch(basePayloadInput.endpoint + '/post', {
        method: 'POST',
        headers: payload.headers,
        body: JSON.stringify(payload.body),
    });
    return await unboxRankResult(await result.json(), rankInput.candidates_type);
}

async function getRankPayload(rankInput: RankInput, basePayloadInput: BasePayloadInput): Promise<Payload> {
    const payload = getBasePayload(rankInput.parameters as AllParameters, basePayloadInput);
    payload.body.exec_endpoint = '/rank';

    let doc: Document;
    if (rankInput.text) {
        doc = (await loadPlainIntoDocument(rankInput.text, 'text')) as Document;
    } else if (rankInput.image) {
        doc = (await loadPlainIntoDocument(rankInput.image, 'image')) as Document;
    } else {
        throw new Error('Please provide either text or image to rank.');
    }

    const candidatesDocs = [] as Document[];
    for (const candidate of rankInput.candidates) {
        candidatesDocs.push((await loadPlainIntoDocument(candidate, rankInput.candidates_type)) as Document);
    }

    doc.matches = candidatesDocs as Document[];
    payload.body.data = [doc] as DocumentArray;
    return payload;
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
