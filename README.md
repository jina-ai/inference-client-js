# Inference Client JS

## Installation

```bash
$ npm install inference-client
```

## Initialization

```javascript
import Client from 'inference-client';

const client = new Client('Your Jina AI Auth Token')
```

## Caption

```javascript
const model = await client.getModel('Salesforce/blip2-flan-t5-xl');

const c = await model.caption({ image: 'https://picsum.photos/200' });
// OR 
const c = await model.caption({ image: 'path/to/local/image' });

console.log(c);
```

## Encode

```javascript
const model = await client.getModel('ViT-H-14::laion2b-s32b-b79k');

const e = await model.encode({ text: 'hello world' });
// OR
const e = await model.encode({ image: 'https://picsum.photos/200' });
// OR
const e = await model.encode({ image: 'path/to/local/image' });

console.log(e);
```

## Rank

```javascript
const model = await client.getModel('ViT-H-14::laion2b-s32b-b79k');

const r = await model.rank({ text: 'hello world', text_candidates: ['hello Jina', 'hello Ziniu'] });

// OR

const r = await model.rank({
    text: 'green field and blue sky',
    image_candidates: ['https://picsum.photos/id/254/200', 'https://picsum.photos/id/255/200'],
});
// OR
const r = await model.rank({
    image: 'https://picsum.photos/id/254/200',
    text_candidates: ['green field and blue sky', 'black trees'],
});
// OR
const r = await model.rank({
    image: 'https://picsum.photos/id/251/200',
    image_candidates: ['https://picsum.photos/id/254/200', 'https://picsum.photos/id/255/200'],
});

console.log(r);
```

## Upscale

```javascript
const model = await client.getModel('LapSRN_x2')

const u = await model.upscale({ image: 'https://picsum.photos/id/251/200' });
// OR
const u = await model.upscale({ image: 'https://picsum.photos/id/251/200', scale: '600:800' });
// OR
const u = await model.upscale({ image: 'https://picsum.photos/id/251/200', image_format: 'jpeg' });

console.log(u);
```

## VQA

```javascript
const model = await client.getModel('Salesforce/blip2-flan-t5-xl');

const v = await model.vqa({
    image: 'https://picsum.photos/200',
    question: 'Qustion: what are the main colors of this image? Answer:',
});
// OR
const v = await model.vqa({
    image: 'path/to/local/image',
    question: 'Qustion: what are the main colors of this image? Answer:',
});

console.log(v);
```