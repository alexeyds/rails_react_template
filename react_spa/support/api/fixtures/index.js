import fs from "fs";
import path from "path";

export default fs.readdirSync(path.join(__dirname)).reduce(assignFixtures, {});

function assignFixtures(fixtures, file) {
  if (file !== 'index.js') {
    let fileFixtures = require(`./${file}`);
    Object.assign(fixtures, fileFixtures);
  }

  return fixtures;
}
