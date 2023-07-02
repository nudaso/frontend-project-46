import _ from 'lodash';

const analyzer = (obj1, obj2) => {
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

export default analyzer;