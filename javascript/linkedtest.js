var List = require('./linked');

var l = new List();
l.add('world');
l.add('hello');
l.add('josh');
l.add('kehn');

l.tree(console.log);

console.log('***********');

l = new List();
l.add('world');
l.tree(console.log);
l.remove('world');
l.tree(console.log);

console.log('***********');
