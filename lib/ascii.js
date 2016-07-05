var fs = require('fs');
module.exports = function() {
  var index = Math.random() * (2 - 1) + 1
  var text = fs.readFileSync('./ascii/ascii' + Math.round(index), 'utf8');
  console.log(text);
}
