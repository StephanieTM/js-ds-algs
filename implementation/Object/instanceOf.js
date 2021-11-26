function instanceOf(obj, Constructor) {
  let proto = obj.__proto__;

  while (proto) {
    if (proto === Constructor.prototype) return true;
    proto = proto.__proto__;
  }

  return false;
}
