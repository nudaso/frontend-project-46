import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import { expect, test } from '@jest/globals';
import gendiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('rofl', () => {
  const result = readFile('result.txt');
  expect(gendiff(getFixturePath('file1.json'), getFixturePath('file2.json'))).toBe(result);
});
