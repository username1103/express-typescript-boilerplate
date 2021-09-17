type MyObj = {
  [key: string]: any;
};

export default (object: MyObj, keys: Array<string>): MyObj =>
  keys.reduce((obj: MyObj, key: string): MyObj => {
    if (key in object) {
      // eslint-disable-next-line no-param-reassign
      obj[key] = object[key];
    }
    return obj;
  }, {});
