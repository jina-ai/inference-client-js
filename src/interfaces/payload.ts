import { DocumentArray, NDArray } from "./docarray";

export interface Parameters {
    drop_image_content?: boolean;
}

export interface BaseInput {
    endpoint: string;
    token?: string;
    parameters?: Parameters;
    request_size?: number;
}

export interface CaptionInput extends BaseInput {
    image?: NDArray | string;
    docs?: DocumentArray;
}


export interface EncodeInput extends BaseInput {
    text?: string;
    image?: NDArray | string;
    docs?: DocumentArray;
}

export interface Payload {
    headers: {
        'Content-Type?': string;
        Authorization?: string;

    }
    body: {
        data?: DocumentArray;
        parameters?: Parameters;
        exec_endpoint?: string;
    }
    
}


// resp = fetch('https://us-central1-causal-diffusion.cloudfunctions.net/describe', {
//   headers: {
//     'x-api-key': `token ${YOUR_GENERATED_SECRET}`,
//     'content-type': 'application/json'
//   },
//   body: JSON.stringify({
//     data: [
//   {image: "https://picsum.photos/200", features: []},
//   {image: "https://cdn.discordapp.com/attachments/1083723388712919182/1089909178266558554/HannaD_A_captivating_digital_artwork_features_a_red-haired_girl_664d73dc-b537-490e-b044-4fbf22733559.png", features: []},
//   ]
//   }),
//   method: 'POST'
// });
  