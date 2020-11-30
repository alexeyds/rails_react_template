export function addClass(classes, newClass) {
  if (classes) {
    return classes + ' ' + newClass;  
  } else {
    return newClass;
  }
}
