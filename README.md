# Inference Client JS

## Initialization

```javascript
const client = new Client('Your Jina AI Auth Token')
```

## Caption

```javascript
const model = await client.getModel('Salesforce/blip2-flan-t5-xl');

const c = await model.caption('url/or/path/to/image');

console.log(c);
```

## Encode

```javascript
const model = await client.getModel('ViT-H-14::laion2b-s32b-b79k');

const e = await model.encodeText('Hello World');
// OR
const e = await model.encodeImage('url/or/path/to/image');

console.log(e);
```

## Rank

```javascript
const model = await client.getModel('ViT-H-14::laion2b-s32b-b79k');

const r = await model.rankTextText('hello world', ['hello Jina', 'hello Ziniu']);
// OR
const r = await model.rankTextImage('green field and blue sky', ['https://picsum.photos/id/254/200', 'https://picsum.photos/id/255/200']);
// OR
const r = await model.rankImageText('https://picsum.photos/id/254/200', ['green field and blue sky', 'black trees']);
// OR
const r = await model.rankImageImage('https://picsum.photos/id/251/200', ['https://picsum.photos/id/254/200', 'https://picsum.photos/id/255/200'])

console.log(r);
```

## Upscale

```javascript
const model = await client.getModel('LapSRN_x2')

const u = await model.upscale('url/or/path/to/image');

console.log(u);
```

## VQA

```javascript
const model = await client.getModel('Salesforce/blip2-flan-t5-xl');

const v = await model.vqa('url/or/path/to/image', 'What is the color of the sky?');

console.log(v);
```