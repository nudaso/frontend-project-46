import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import { expect, test } from '@jest/globals';
import gendiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('json stylish', () => {
  const result = readFile('stylishResult.txt');
  expect(gendiff(getFixturePath('file1.json'), getFixturePath('file2.json'))).toBe(result);
});

test('yaml stylish', () => {
  const result = readFile('stylishResult.txt');
  expect(gendiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'))).toBe(result);
});

test('json plain', () => {
  const result = readFile('plainResult.txt');
  expect(gendiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'plain')).toBe(result);
});
