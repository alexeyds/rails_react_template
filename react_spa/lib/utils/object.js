import { camelize } from "utils/string";

import isPlainObject from "lodash.isplainobject";
export { isPlainObject };


export function deepCamelizeKeys(object) {
  return deepMapKeys(object, camelize);
}

export function deepMapKeys(object, mapper) {
  let result = {};

  for (let key in object) {
    let value = object[key];
    let newKey = mapper(key);

    result[newKey] = maybeMapKeys(value, mapper);
  }

  return result;
}

function maybeMapKeys(value, mapper) {
  if (isPlainObject(value)) {
    return deepMapKeys(value, mapper);
  } else if (Array.isArray(value)) {
    return value.map(i => maybeMapKeys(i, mapper));
  } else {
    return value;
  }
}
