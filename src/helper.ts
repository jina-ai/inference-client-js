import { fetch } from 'undici';


export async function getModelSpec(modelName: string, token: string): Promise<any> {
    const url = 'https://api.clip.jina.ai/api/v1/models/?model_name=' + modelName;
    

    const response = await fetch(url, {
        headers: {
            Authorization: `${token}`,
        },
    });

    if (response.status === 401) {
        throw new Error('The given Jina auth token is invalid. Please check your Jina auth token.');
    }
    else if (response.status === 404) {
        throw new Error('Invalid model name ${modelName} provided. Please visit https://cloud.jina.ai/user/inference to create and use the model names listed there.')
    }
    return response.json();
}