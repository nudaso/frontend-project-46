import fs from 'node:fs';
import path from 'node:path';
import _ from 'lodash';

const getAbsolutePath = (pathToFile) => {
  if (path.isAbsolute(pathToFile)) {
    return pathToFile;
  }
  return path.resolve(process.cwd(), pathToFile);
};

const getFileContent = (pathToFile) => fs.readFileSync(pathToFile, 'utf-8');

const gendiff = (filepath1, filepath2) => {
  const absolutePath1 = getAbsolutePath(filepath1);
  const absolutePath2 = getAbsolutePath(filepath2);

  const data1 = getFileContent(absolutePath1);
  const data2 = getFileContent(absolutePath2);

  const obj1 = JSON.parse(data1);
  const obj2 = JSON.parse(data2);

  const allKeys = [...Object.keys(obj1), ...Object.keys(obj2)];
  const uniqFilteredKeys = _.sortedUniq(_.sortBy(allKeys));

  const inside = uniqFilteredKeys.reduce((acc, key) => {
    const value1 = obj1[key];
    const value2 = obj2[key];

    if (value1 === value2) {
      return [...acc, `  ${key}: ${value2}`];
    }

    if (Object.hasOwn(obj1, key) && !Object.hasOwn(obj2, key)) {
      return [...acc, `- ${key}: ${value1}`];
    }
    if (!Object.hasOwn(obj1, key) && Object.hasOwn(obj2, key)) {
      return [...acc, `+ ${key}: ${value2}`];
    }

    return [...acc, `- ${key}: ${value1}`, `+ ${key}: ${value2}`];
  }, []);

  return `{\n${inside.join('\n')}\n}`;
};

export default gendiff;
