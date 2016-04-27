var setup = require('./setup');
var prompt = require('prompt');
var vm = require('vm');
var yaml = require('write-yaml');
var uuid = require('node-uuid');

setup.database();

prompt.start();

listenForCommand();

var commands = {};

commands.configure = function () {
  console.log('Configure method called');
}

commands.seed = function () {
  console.log('STARTING SEEDING PROCESS');
  console.log('ATTENTION: THIS WILL OVERWRITE YOUR PREVIOUS SEED');
  var seed = uuid.v4();
  console.log('WRITING...');
  yaml.sync('./config/seed.yml', {default: {seed: seed} });
  console.log('Done');
}

function listenForCommand() {
  prompt.get(['command'], function (err, result) {
    if (err) {
      console.log('Error: ' + err);
      process.exit();
    } else {
      executeCommand(result.command);
    }
  });
}

function executeCommand(name) {
  if (!commands[name]) {
    console.log('Error, command not found');
  } else {
    if (!vm.isContext(commands)) vm.createContext(commands);
    vm.runInContext(name + '();', commands);
  }
  listenForCommand();
}

