import plain from './plain.js';
import stylish from './stylish.js';

const formater = (name) => {
  switch (name) {
    case 'plain':
      return plain;
    case 'stylish':
      return stylish;
    case 'json':
      return JSON.stringify;
    default:
      throw new Error('error');
  }
};

export default formater;
