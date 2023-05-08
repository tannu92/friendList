export const nameRegex = value =>  value && !/^([a-zA-Z.]+\s?)*$/.test(value) ?
  'Invalid name' : undefined