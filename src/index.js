import fs from 'node:fs';
import path from 'node:path';
import parse from './parsers.js';
import buildADT from './buildADT.js';
import getFormater from './formatters/index.js';

const getAbsolutePath = (pathToFile) => {
  if (path.isAbsolute(pathToFile)) {
    return pathToFile;
  }
  return path.resolve(process.cwd(), pathToFile);
};

const getFileContent = (pathToFile) => fs.readFileSync(pathToFile, 'utf-8');

const gendiff = (filepath1, filepath2, format = 'stylish') => {
  const absolutePath1 = getAbsolutePath(filepath1);
  const absolutePath2 = getAbsolutePath(filepath2);

  const extname1 = path.extname(filepath1);
  const extname2 = path.extname(filepath2);

  const data1 = getFileContent(absolutePath1);
  const data2 = getFileContent(absolutePath2);

  const obj1 = parse(data1, extname1);
  const obj2 = parse(data2, extname2);

  const ADT = buildADT(obj1, obj2);
  const formater = getFormater(format);

  return formater(ADT);
};

export default gendiff;
