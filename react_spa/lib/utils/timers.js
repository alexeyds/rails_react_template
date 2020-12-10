export function setClearableTimeout() {
  let id = setTimeout(...arguments);
  return () => clearTimeout(id);
}
