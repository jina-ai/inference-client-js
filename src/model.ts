import { encode } from "./tasks/encode";
import { caption } from "./tasks/caption";
import { Parameters } from "interfaces/payload";
import { NDArray } from "interfaces/docarray";


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

    public encode(n1: number, n2: number): void {
        encode(this.host, this.token, [n1, n2]);
    }

    public async caption(image: NDArray | string, parameters?: Parameters): Promise<any> {
        return await caption({image: image, parameters: parameters}, {endpoint: this.host, token: this.token});
    }
}
