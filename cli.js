var setup = require('./setup');
var prompt = require('prompt');
var vm = require('vm');
var yaml = require('write-yaml');
var uuid = require('node-uuid');
var crypto = require('crypto');


setup.database();

prompt.start();

listenForCommand();

var commands = {};

commands.seed = function () {
  console.log('STARTING SEEDING PROCESS');
  console.log('ATTENTION: THIS WILL OVERWRITE YOUR PREVIOUS SEED');
  var seed = uuid.v4();
  console.log('WRITING...');
  yaml.sync('./config/seed.yml', {default: {seed: seed} });
  console.log('Done');
  global.config = require('konfig')();
  listenForCommand();
}

commands.genkey = function () {
  console.log('ATTENTION: This will generate the key using the seed!');

  var seed = global.config.seed.seed;
  prompt.get(['identifier'], function (err, result) {
    if (!err) {
      var composition = result.identifier + seed;
      var key = crypto.createHash('sha256').update(composition).digest('hex');
      console.log('KEY: ' + key);
      listenForCommand();
    } else {
      console.log('error generating key');
      listenForCommand();
    }
  });
}

function listenForCommand() {
  prompt.get(['command'], function (err, result) {
    if (err) {
      console.log('Error: ' + err);
      listenForCommand();
    } else {
      executeCommand(result.command);
    }
  });
}

function executeCommand(name) {
  if (!commands[name]) {
    console.log('Error, command not found');
    listenForCommand();
  } else {
    if (!vm.isContext(commands)) vm.createContext(commands);
    vm.runInContext(name + '();', commands);
  }
}

