import { fetch } from 'undici';

// export async function login(token: string | undefined): Promise<void> {
//     if (!token) {
//       throw new Error('Token not provided.');
//     }

//     const url = 'https://api.hubble.jina.ai/v2/rpc/user.identity.whoami';

//     try {
//       const response = await fetch(url, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (!response.ok) {
//         throw new Error('Token validation failed.');
//       }

//       console.log('Token validated successfully.');
//     } catch (error) {
//       console.error('An error occurred during token validation:', error);
//     }
//   }



export async function getModelSpec(modelName: string, token: string): Promise<any> {
    const url = 'https://api.clip.jina.ai/api/v1/models/?model_name=' + modelName;
    
    const response = await fetch(url, {
        headers: {
            Authorization: `${token}`,
        },
    });
    return response.json();
}