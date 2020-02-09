import * as fs from 'fs';
import * as path from 'path';

const generateJson = () => {
  const pics = fs
    .readdirSync(path.join('public'))
    .filter((image: string) => /jpe?g/.test(image));

  const obj = { pics };

  const json = JSON.stringify(obj);

  fs.writeFileSync(path.join('public', 'images.json'), json);
  // eslint-disable-next-line no-console
  console.log('wrote list of images to public dir');
};

generateJson();
