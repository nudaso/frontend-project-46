import fs from 'node:fs';
import path from 'node:path';
import parse from './parsers.js';
import buildADT from './buildADT.js';
import stylish from './stylish.js';

const getAbsolutePath = (pathToFile) => {
  if (path.isAbsolute(pathToFile)) {
    return pathToFile;
  }
  return path.resolve(process.cwd(), pathToFile);
};

const getFileContent = (pathToFile) => fs.readFileSync(pathToFile, 'utf-8');

// const generateSpace = (count, space = '  ') => space.repeat(count);

// const view = (adt, deep = 0) => {
//   const result = adt.flatMap((node) => {
//     const {path: currentPath, status: currentStatus, value, prevValue, currentValue} = node;
//     const key = currentPath.split('.').at(-1);
//     const space = generateSpace(deep + 1);
//     switch (currentStatus) {
//       case status.equal:
//         if (Array.isArray(value)) {
//           return `${space}  ${key}: ${view(value, deep + 2)}`
//         }
//         return `${space}  ${key}: ${value}`;
      
//       case status.added:
//         if (Array.isArray(value)) {
//           return `${space}+ ${key}: ${view(value, deep + 2)}`
//         }
//         return `${space}+ ${key}: ${value}`;
      
//       case status.adsent:
//         if (Array.isArray(value)) {
//           return `${space}- ${key}: ${view(value, deep + 2)}`
//         }
//         return `${space}- ${key}: ${value}`;

//       case status.updated:
//         return `${space}- ${key}: ${Array.isArray(prevValue) ? view(prevValue, deep + 2) : prevValue}\n${space}+ ${key}: ${Array.isArray(currentValue) ? view(currentValue, deep + 2) : currentValue}`
//       case status.guts:
//         if (Array.isArray(value)) {
//           return `${space}  ${key}: ${view(value, deep + 2)}`
//         }
//         return `${space}  ${key}: ${value}`;
      
//       default:
//         throw new Error('Error');
//     }
//   });
//   return [`{`, ...result, `${deep === 0 ? '' : generateSpace(deep)}}`].join('\n');
// };

const gendiff = (filepath1, filepath2) => {
  const absolutePath1 = getAbsolutePath(filepath1);
  const absolutePath2 = getAbsolutePath(filepath2);

  const extname1 = path.extname(filepath1);
  const extname2 = path.extname(filepath2);

  const data1 = getFileContent(absolutePath1);
  const data2 = getFileContent(absolutePath2);

  const obj1 = parse(data1, extname1);
  const obj2 = parse(data2, extname2);

  const ADT = buildADT(obj1, obj2);
  
  return stylish(ADT);
};

export default gendiff;
