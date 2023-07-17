import plain from './plain.js';
import stylish from './stylish.js';

const formater = (name) => {
  switch (name) {
    case 'plain':
      return plain;
    case 'stylish' :
      return stylish;
  }
};

export default formater;