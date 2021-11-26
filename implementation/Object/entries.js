Object._entries = function(obj) {
  const keys = Object.keys(obj); // own properties
  const result = [];

  for (let i = 0; i < keys.length; i += 1) {
    result.push([keys[i], obj[keys[i]]]);
  }

  return result;
}
