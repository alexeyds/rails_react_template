import { repeat } from "utils/array";

export default function factory(definitions) {
  let builder = (assigns={}) => buildItem(definitions, assigns);
  builder.repeat = (n, assigns) => repeat(n, () => builder(assigns));
  builder.derive = (otherDefinitions) => factory({...definitions, ...otherDefinitions});

  return builder;
}

function buildItem(definitions, assigns) {
  let result = {};

  for (let key in definitions) {
    let value = definitions[key];
    let assignsValue = assigns[key];

    result[key] = assignsValue === undefined ? resolve(value) : assignsValue;
  }

  return result;
}

function resolve(value) {
  return typeof value === 'function' ? value() : value;
}