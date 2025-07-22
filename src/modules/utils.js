export function firstCharToUpper(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function getShortLocaleCode(fullCode) {
  return fullCode.split('-')[0];
}
