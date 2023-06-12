import { EncodeInput, CaptionInput, RankInput, UpscaleInput, VqaInput } from 'interfaces/payload';
import { NDArray } from 'interfaces/docarray';
import { caption } from './tasks/caption';
import { encode } from './tasks/encode';
import { rank } from './tasks/rank';
import { upscale } from './tasks/upscale';
import { vqa } from './tasks/vqa';

export default class Model {
    private modelName: string | undefined;
    private token: string | undefined;
    private host: string;

    constructor(modelName: string | undefined, token: string | undefined, host: string) {
        this.modelName = modelName;
        this.token = token;
        this.host = host;

        this.modelName;
    }

    public async caption(captionInput: CaptionInput): Promise<string | string[]> {
        return await caption(captionInput, { endpoint: this.host, token: this.token });
    }

    public async encode(encodeInput: EncodeInput): Promise<NDArray> {
        return await encode(encodeInput, { endpoint: this.host, token: this.token });
    }

    public async rank(rankInput: RankInput): Promise<NDArray[] | string[]> {
        return await rank(rankInput, { endpoint: this.host, token: this.token });
    }

    public upscale(upscaleInput: UpscaleInput): Promise<NDArray | string> {
        return upscale(upscaleInput, { endpoint: this.host, token: this.token });
    }

    public async vqa(vqaInput: VqaInput): Promise<string> {
        return await vqa(vqaInput, { endpoint: this.host, token: this.token });
    }
}
