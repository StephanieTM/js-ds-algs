const ajax = {
  get(url, fn) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true); // method, url, async
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        fn(xhr.responseText);
      }
    };
    xhr.send();
  },
  post(url, data, fn) {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', url, true); // method, url, async
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        fn(xhr.responseText);
      }
    };
    xhr.send(data);
  },
};
