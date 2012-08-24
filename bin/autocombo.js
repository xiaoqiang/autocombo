#!/usr/bin/env node

main(process.argv.slice());


function main(argv) {
  var server = require('../'),
  watch = false;

  function getArg() {
    var args = argv.shift();
    args = args.split('=');
    if (args.length > 1) {
      argv.unshift(args.slice(1).join('='));
    }
    return args[0];
  }

  var arg;
  while (argv.length) {
    arg = getArg();
    switch(arg) {
      case '-w':
      case '--watch':
        watch = true;
        break
      case '-h':
      case '--help':
        helpMessage()
        process.exit(0)
        break
      default:
        break
    }
  }


  console.log('watch model is ' + watch);
  server.start(watch)
}


function helpMessage() {
  var lines = [
    'Usage:',
    '  autocombo [-w / --watch]',
    '',
    'Options:',
    '  -w, --watch          watch for file modification',
    '  -h, --help           display this message',
    '',
    'Examples:',
    '  $ autocombo',
    '  $ autocombo -w'
  ]
  console.log(lines.join('\n'))
}
