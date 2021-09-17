const arr = [7, 8, 2, 19, 0, -1, 55, 1000];

function insert(array, rightIndex, value) {
  for (let i = rightIndex; i >= 0; i -= 1) {
    if (value < array[i]) {
      array[i + 1] = array[i];
      if (i === 0) {
        array[i] = value;
      }
      continue;
    } else {
      if (i === rightIndex) {
        break;
      }
      array[i + 1] = value;
      break;
    }
  }
}

console.log('arr :>> ', arr);
for (let i = 0; i < arr.length - 1; i += 1) {
  const value = arr[i + 1];
  let j;
  for (j = i; j >= 0 && value < arr[j]; j -= 1) {
    arr[j + 1] = arr[j];
  }
  arr[j + 1] = value;
}
console.log('arr :>> ', arr);
