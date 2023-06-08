import { encode } from "./tasks/encode";
import { caption } from "./tasks/caption";
import { CaptionInput } from "interfaces/payload";


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

    public async caption(input: CaptionInput): Promise<any> {
        return await caption(input, {endpoint: this.host, token: this.token});
    }
}
