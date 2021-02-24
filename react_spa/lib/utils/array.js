export function repeat(times, func) {
  let result = [];

  for (let n=0; n < times; n++) {
    result.push(func());
  }

  return result;
}
