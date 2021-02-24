import { capitalize } from "utils/string";
import { buildQueries } from '@testing-library/react';

export default function createQueries({name, selector}) {
  let capitalizedName = capitalize(name);

  let queryAllBy = selector;
  let getMultipleError = (c, value) => `Found multiple elements with ${name}: ${value}`;
  let getMissingError = (c, value) => `Unable to find an element with ${name}: ${value}`;

  let [
    queryBy,
    getAllBy,
    getBy,
    findAllBy,
    findBy,
  ] = buildQueries(queryAllBy, getMultipleError, getMissingError);

  return {
    [`queryAllBy${capitalizedName}`]: queryAllBy,
    [`queryBy${capitalizedName}`]: queryBy,
    [`getAllBy${capitalizedName}`]: getAllBy,
    [`getBy${capitalizedName}`]: getBy,
    [`findAllBy${capitalizedName}`]: findAllBy,
    [`findBy${capitalizedName}`]: findBy
  };
}
