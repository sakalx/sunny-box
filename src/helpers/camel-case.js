export const camelCaseToString = string =>
  string.split(/(?=[A-Z])/)
    .map((word, index) =>
      index === 0
        ? word[0].toUpperCase() + word.slice(1)
        : word[0].toLowerCase() + word.slice(1)
    ).join(' ');

export const stringToCamelCase = string =>
  string.replace(/(?:^\w|[A-Z]|\b\w)/g,
    (letter, index) =>
      index === 0
        ? letter.toLowerCase()
        : letter.toUpperCase()
  ).replace(/\s+/g, '');