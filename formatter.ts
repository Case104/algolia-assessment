const fs = require('fs');
const JSONStream = require('JSONStream');
const es = require('event-stream');

const readStream = fs.createReadStream('cards-raw.json');
const writeStream = fs.createWriteStream('lorcana.json');

const transformStream = es.mapSync((data) => {
  const transformedData = {
    id: data.id,
    name: data.name,
    title: data.title,
    cost: data.cost,
    inkwell: data.inkwell,
    attack: data.attack,
    defense: data.defense,
    color: data.color,
    type: data.type,
    action: data.action,
    stars: data.stars,
    image: data.image,
    traits: data.traits,
  };
  return transformedData;
});

readStream
  .pipe(JSONStream.parse('cards.*'))
  .pipe(transformStream)
  .pipe(JSONStream.stringify())
  .pipe(writeStream);