import _ from 'lodash';
import status from './status.js';

const getPath = (currentPath, key) => currentPath === '' ? key : `${currentPath}.${key}`;

export const addObject = (obj, currentPath = '') => {
  const keys = Object.keys(obj);
  const sortedKeys = _.sortBy(keys);
  const result = sortedKeys.map((key) => {
    const value = obj[key]
    const path = getPath(currentPath, key);
    if (_.isObject(value)) {
      return { path, status: status.guts, value: addObject(value, path) };
    }
    return { path, status: status.guts, value };
  });
  return result;
}

const buildADT = (obj1, obj2, currentPath = '') => {
  const keys = [...Object.keys(obj1), ...Object.keys(obj2)];
  const sortedUniqKeys = _.sortedUniq(_.sortBy(keys));
  
  const result = sortedUniqKeys.map((key) => {
    const value1 = obj1[key];
    const value2 = obj2[key];
    const path = getPath(currentPath, key);
    if (!Object.hasOwn(obj1, key)) {
      if (_.isObject(value2)) {
        return { path, status: status.added, value: addObject(value2, path) };
      }
      return { path, status: status.added, value: value2 };
    }
    
    if (!Object.hasOwn(obj2, key)) {
      if (_.isObject(value1)) {
        return { path, status: status.adsent, value: addObject(value1, path) };
      }
      return { path, status: status.adsent, value: value1 };
    }
    
    if (value1 === value2) {
      return { path, status: status.equal, value: value1 };
    }

    if (_.isObject(value1) && _.isObject(value2)) {
      return { path, status: status.equal, value: buildADT(value1, value2, path) };
    }

    return { path, status: status.updated,
      prevValue: _.isObject(value1) ? addObject(value1, path) : value1,
      currentValue: _.isObject(value2) ? addObject(value2, path) : value2
    };
  });

  return result;
};

export default buildADT;
