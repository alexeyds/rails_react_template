import { camelize, snakeCase } from "utils/string";
import isPlainObject from "lodash/isPlainObject";
import merge from "lodash/merge";

export { isPlainObject };
export { default as isDeepEqual } from "lodash/isEqual";
export { default as dig } from "lodash/get";

export function deepCamelizeKeys(object) {
  return deepMapKeys(object, camelize);
}

export function deepSnakifyKeys(object) {
  return deepMapKeys(object, snakeCase);
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

export function fromFlatArray(array) {
  return array.reduce((result, item) => {
    result[item] = item;
    return result;
  }, {});
}

export function map(object, mapper) {
  let result = [];

  for (let key in object) {
    let value = object[key];
    result.push(mapper(key, value));
  }

  return result;
}

export function deepMerge(...objects) {
  return merge({}, ...objects);
}
