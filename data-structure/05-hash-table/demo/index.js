import HashTable from '../HashTable';

const defaultHashTable = new HashTable();

console.log('defaultHashTable.hash(\'abcd\') :>> ', defaultHashTable.hash('abcd'));

const hashTable = new HashTable(3);

hashTable.set('a', 'hello');
hashTable.set('a', 'cat');
hashTable.set('b', 'dog');
hashTable.set('c', 'fox');
hashTable.set('d', 'pig');
hashTable.set('ab', 'hey');
hashTable.set('ba', 'ho');

console.log('hashTable.has(\'x\') :>> ', hashTable.has('x'));
console.log('hashTable.has(\'a\') :>> ', hashTable.has('a'));

const stringifier = (value) => `${value.key}:${value.value}`;

console.log('hashTable.buckets[0].toString(stringifier) :>> ', hashTable.buckets[0].toString(stringifier));
console.log('hashTable.buckets[1].toString(stringifier) :>> ', hashTable.buckets[1].toString(stringifier));
console.log('hashTable.buckets[2].toString(stringifier) :>> ', hashTable.buckets[2].toString(stringifier));

console.log('hashTable.get(\'x\') :>> ', hashTable.get('x'));
console.log('hashTable.get(\'a\') :>> ', hashTable.get('a'));

hashTable.delete('a');
console.log('hashTable.get(\'a\') :>> ', hashTable.get('a'));

console.log('hashTable.getKeys() :>> ', hashTable.getKeys());
console.log('hashTable.getValues() :>> ', hashTable.getValues());
