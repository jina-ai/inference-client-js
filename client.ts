import { getModelSpec } from "./helper";
import Model from "./model";

export default class Client {
  private authToken: string | undefined;

  constructor(token?: string) {
    this.authToken = token;
  }

  public async getModel(modelName?: string, endpoint?: string): Promise<Model> {
    if (!modelName && !endpoint) {
      throw new Error('Please provide an endpoint or a valid user token to access the model.');
    }
    
    let httpEndpoint = endpoint ?? '';

    if (this.authToken && modelName) {
        const spec = await getModelSpec(modelName, this.authToken);
        httpEndpoint = spec['endpoints']['http'];
    }

    return new Model(modelName, this.authToken, httpEndpoint);
  }
}