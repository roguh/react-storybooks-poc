function error(s) {
  // eslint-disable-next-line no-console
  console.log(s);
}

// eslint-disable-next-line no-underscore-dangle
global._errors = { error };
