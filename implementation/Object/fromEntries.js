Object._fromEntries = function (arr) {
  const obj = {};

  for (let i = 0; i < arr.length; i += 1) {
    const [key, value] = arr[i];
    obj[key] = value;
  }

  return obj;
};
