import glob from "glob";
import path from "path";
import { camelize } from "utils/string";

const FILE_MARKER = '_expectations.js';

let files = glob.sync(path.join(__dirname, `*${FILE_MARKER}`));
let expectations = {};

files.forEach(f => {
  let expectationName = camelize(path.basename(f).replace(FILE_MARKER, ''));
  expectations[expectationName] = require(f);
});

export default expectations;