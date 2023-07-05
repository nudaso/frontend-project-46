import status from "./status.js";


const generateSpace = (count, space = '  ') => space.repeat(count);

const view = (adt, deep = 0) => {
  const result = adt.flatMap((node) => {
    const {path: currentPath, status: currentStatus, value, prevValue, currentValue} = node;
    const key = currentPath.split('.').at(-1);
    const space = generateSpace(deep + 1);
    switch (currentStatus) {
      case status.equal:
        if (Array.isArray(value)) {
          return `${space}  ${key}: ${view(value, deep + 2)}`
        }
        return `${space}  ${key}: ${value}`;
      
      case status.added:
        if (Array.isArray(value)) {
          return `${space}+ ${key}: ${view(value, deep + 2)}`
        }
        return `${space}+ ${key}: ${value}`;
      
      case status.adsent:
        if (Array.isArray(value)) {
          return `${space}- ${key}: ${view(value, deep + 2)}`
        }
        return `${space}- ${key}: ${value}`;

      case status.updated:{
        const line1 =  `${space}- ${key}: ${Array.isArray(prevValue) ? view(prevValue, deep + 2) : prevValue}`;
        const line2 = `${space}+ ${key}: ${Array.isArray(currentValue) ? view(currentValue, deep + 2) : currentValue}`;
        return `${line1}\n${line2}`
      }
      case status.guts:
        if (Array.isArray(value)) {
          return `${space}  ${key}: ${view(value, deep + 2)}`
        }
        return `${space}  ${key}: ${value}`;
      
      default:
        throw new Error('Error');
    }
  });
  return [`{`, ...result, `${deep === 0 ? '' : generateSpace(deep)}}`].join('\n');
};

export default view;