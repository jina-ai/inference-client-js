import { encode } from "./tasks/encode";
import { caption } from "./tasks/caption";
import { Parameters } from "interfaces/payload";
import { NDArray } from "interfaces/docarray";
import { vqa } from "./tasks/vqa";


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

    public async encodeText(text: string, parameters?: Parameters): Promise<NDArray> {
        return await encode({text: text, parameters: parameters}, {endpoint: this.host, token: this.token});
    }

    public async encodeImage(image: NDArray | string, parameters?: Parameters): Promise<NDArray> {
        return await encode({image: image, parameters: parameters}, {endpoint: this.host, token: this.token});
    }

    public async caption(image: NDArray | string, parameters?: Parameters): Promise<string> {
        return await caption({image: image, parameters: parameters}, {endpoint: this.host, token: this.token});
    }

    public async vqa(image: NDArray | string, question: string, parameters?: Parameters): Promise<string> {
        return await vqa({image: image, question: question, parameters: parameters}, {endpoint: this.host, token: this.token});
    }
}
