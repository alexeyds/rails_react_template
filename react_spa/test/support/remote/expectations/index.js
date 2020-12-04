import fs from "fs";
import path from "path";
import { camelize } from "utils/string";

export default fs.readdirSync(__dirname).reduce(addExpectationExport, {});

function addExpectationExport(expectationExports, file) {
  if (file !== 'index.js') {
    let exportName = camelize(path.parse(file).name);
    expectationExports[exportName] = require(`./${file}`);
  }

  return expectationExports;
}
