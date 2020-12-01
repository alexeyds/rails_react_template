import glob from "glob";
import path from "path";
import { camelize } from "utils/string";

const FILE_MARKER = '_fixtures.js';

let files = glob.sync(path.join(__dirname, `*${FILE_MARKER}`));
let fixtures = {};

files.forEach(f => {
  let fixtureName = camelize(path.basename(f).replace(FILE_MARKER, ''));
  fixtures[fixtureName] = require(f);
});

export default fixtures;