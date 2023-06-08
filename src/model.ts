import { encode } from "./tasks/encode";
import { caption } from "./tasks/caption";

export default class Model {
    private modelName: string | undefined;
    private token: string | undefined;
    private host: string;


    constructor(modelName: string | undefined, token: string | undefined, host: string) {
        this.modelName = modelName;
        this.token = token;
        this.host = host;

        this.modelName;
        this.token;
        this.host;
        // console.log(12345);
        // console.log(this.model_name);
        // console.log(this.token);
        // console.log(this.host);
        // console.log(54321);
    }

    public encode(n1: number, n2: number): void {
        encode(this.host, this.token, [n1, n2]);
    }

    public caption(input: any): void {
        caption({image: input, endpoint: this.host, token: this.token})
    }
}
