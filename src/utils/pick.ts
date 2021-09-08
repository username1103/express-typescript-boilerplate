export default (object: MyObj, keys: Array<string>) => {
  return keys.reduce((obj: MyObj, key: string) => {
    if (key in object) {
      obj[key] = object[key];
    }
    return obj;
  }, {});
};

type MyObj = {
  [key: string]: any;
};
