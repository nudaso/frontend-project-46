import status from "./../status.js";

const plain = (adt) => {
  return adt.flatMap((node) => {
    const {path: currentPath, status: currentStatus, value, prevValue, currentValue} = node;

    switch (currentStatus) {
      case status.equal:
        if (Array.isArray(value)) {
          return plain(value);
        }
        return [];
      
      case status.added:
        if (Array.isArray(value)) {
          return `Property '${currentPath}' was ${status.added} with value: [complex value]`
        }
        return `Property '${currentPath}' was ${status.added} with value: ${typeof value === 'string' ? `'${value}'` : value}`;
      // `Property 'common.follow' was added with value: false`
      case status.adsent:
        // if (Array.isArray(value)) {
        //   return `Property ${path} was ${status.adsent}`
        // }
        return `Property '${currentPath}' was removed`;

      case status.updated:{
        const from = Array.isArray(prevValue) ? '[complex value]' : typeof prevValue === 'string' ? `'${prevValue}'` : prevValue;
        const to  = Array.isArray(currentValue) ? '[complex value]' : typeof currentValue === 'string' ? `'${currentValue}'` : currentValue;
        return `Property '${currentPath}' was updated. From ${from} to ${to}`
        // `Property 'group1.nest' was updated. From [complex value] to 'str'`
      }
      
      case status.guts :
        return [];

    }
  }).join('\n');
}

export default plain;