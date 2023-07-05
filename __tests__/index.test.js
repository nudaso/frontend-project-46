import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import { expect, test } from '@jest/globals';
import gendiff from '../src/index.js';

import buildADT from './../src/buildADT.js';
import { addObject } from './../src/buildADT.js'
import { view } from './../src/index.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

// test('json', () => {
//   const result = readFile('result.txt');
//   expect(gendiff(getFixturePath('file1.json'), getFixturePath('file2.json'))).toBe(result);
// });

// test('yaml', () => {
//   const result = readFile('result.txt');
//   expect(gendiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'))).toBe(result);
// });
test('rofl', () => {
  const obj1 = JSON.parse(`{
    "common": {
      "setting1": "Value 1",
      "setting2": 200,
      "setting3": true,
      "setting6": {
        "key": "value",
        "doge": {
          "wow": ""
        }
      }
    }
  }`);
  const obj2 = JSON.parse(`{
    "common": {
      "follow": false,
      "setting1": "Value 1",
      "setting3": null,
      "setting4": "blah blah",
      "setting5": {
        "key5": "value5"
      },
      "setting6": {
        "key": "value",
        "ops": "vops",
        "doge": {
          "wow": "so much"
        }
      }
    }
  }`);

// {
//   common: {
//     + follow: false
//       setting1: Value 1
//     - setting2: 200
//     - setting3: true
//     + setting3: null
//     + setting4: blah blah
//     + setting5: {
//           key5: value5
//       }
//       setting6: {
//           doge: {
//             - wow: 
//             + wow: so much
//           }
//           key: value
//         + ops: vops
//       }
//   }
// }
const need = [
  {path: 'common', status:'equal', value: 
    [
      {path: 'common.follow', status: 'added', value: false},
      {path: 'common.setting1', status: 'equal', value: 'Value 1'},
      {path: 'common.setting2', status: 'adsent', value: 200},
      {path: 'common.setting3', status: 'updated', prevValue: true, currentValue: null},
      {path: 'common.setting4', status: 'added', value: 'blah blah'},
      {path: 'common.setting5', status: 'added', value: 
        [
          {path: 'common.setting5.key5', status: 'guts', value: 'value5'}
        ]
      },
      {path: 'common.setting6', status: 'equal', value: 
        [
          {path: 'common.setting6.doge', status: 'equal', value: 
            [
              {path: 'common.setting6.doge.wow', status: 'updated', prevValue: '', currentValue: 'so much'}
            ]
          },
          {path: 'common.setting6.key', status: 'equal', value: 'value'},
          {path: 'common.setting6.ops', status: 'added', value: 'vops'}
        ]
      }
    ]
  }
];

  // const test = JSON.stringify(need, null, '  ');
  // console.log(test);
  // console.log(JSON.stringify(buildADT(obj1, obj2), null, '  '));
  // console.log(test === JSON.stringify(buildADT(obj1, obj2), null, '  '))

  expect(buildADT(obj1, obj2)).toEqual(need);
})