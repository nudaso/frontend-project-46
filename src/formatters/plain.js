import _ from 'lodash';
import status from '../status.js';

const formatValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (_.isString(value)) {
    return `'${value}'`;
  }
  return value;
};

const plain = (adt) => adt.flatMap((node) => {
  const {
    path: currentPath, status: currentStatus, value, prevValue, currentValue,
  } = node;

  switch (currentStatus) {
    case status.equal:
      if (Array.isArray(value)) {
        return plain(value);
      }
      return [];

    case status.added:
      if (Array.isArray(value)) {
        return `Property '${currentPath}' was ${status.added} with value: [complex value]`;
      }
      return `Property '${currentPath}' was ${status.added} with value: ${typeof value === 'string' ? `'${value}'` : value}`;

    case status.adsent:
      return `Property '${currentPath}' was removed`;

    case status.updated: {
      const from = formatValue(prevValue);
      const to = formatValue(currentValue);
      return `Property '${currentPath}' was updated. From ${from} to ${to}`;
    }

    default:
      return [];
  }
}).join('\n');

export default plain;
