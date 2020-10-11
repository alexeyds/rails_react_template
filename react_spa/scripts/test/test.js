import { join as joinPath, resolve as resolvePath } from "path";
import glob from "glob";

process.on('unhandledRejection', err => {
  throw err;
});

extractArgvPaths().forEach(requireTestFiles);

function extractArgvPaths() {
  let defaultTestDir = 'test';
  let paths = process.argv.slice(2);

  return paths.length === 0 ? [defaultTestDir] : paths;
}

function requireTestFiles(path) {
  isFile(path) ? requireFile(path) : requireFolder(path);
}

function isFile(path) {
  return /\..+$/.test(path);
}

function requireFolder(path) {
  let testFilesGlob = "/**/*_test.*";
  let folder = joinPath(path, testFilesGlob);

  glob.sync(folder).forEach(requireFile);
}

function requireFile(path) {
  require(resolvePath(process.cwd(), path));
}
