import yaml from 'js-yaml';

const parse = (data, ext) => {
  switch (ext) {
    case '.json':
      return JSON.parse(data);
    case '.yaml':
    case '.yml':
      return yaml.load(data);
    default:
      throw new Error('wrong file');
  }
};
export default parse;
