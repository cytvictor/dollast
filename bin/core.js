// Generated by LiveScript 1.3.1
var async, util, config, fs, childProcess, tmp, bluebird, co, debug, path, log, findErr, compile, run, judge, out$ = typeof exports != 'undefined' && exports || this;
async = require('async');
util = require('util');
config = require('./config');
fs = require('mz/fs');
childProcess = require('mz/child_process');
tmp = require('tmp');
bluebird = require('bluebird');
co = require('co');
debug = require('debug');
path = require('path');
tmp = bluebird.promisifyAll(tmp);
log = debug('core');
findErr = function*(msg){
  throw Error('unimplemented');
};
out$.compile = compile = co.wrap(function*(lang, code){
  var tmpDir, srcPath, exePath, srcFile, compileCmd;
  tmpDir = yield tmp.dir;
  srcPath = path.join(tmpDir("/main" + config.langSuffix[lang]));
  exePath = path.join(tmpDir("/main"));
  srcFile = fs.createWriteStream(srcPath);
  srcFile.write(code);
  compileCmd = config.compileFmt[lang](srcPath, exePath);
  log("compile-cmd " + compileCmd);
  yield childProcess.exec(compileCmd);
  return exePath;
});
out$.run = run = co.wrap(function*(lang, exePath, dataAtom, callback){
  var child;
  child = childProcess.spawn(config.sandboxer, [exePath]);
  child.on('data', function(chunk){
    return console.log("on data " + chunk);
  });
  child.on('exit', function(retCode, signal){
    console.log("on exit: " + retCode + " " + signal);
    return callback({
      time: Math.random() * 2,
      space: Math.random() * 128,
      result: Math.random()
    });
  });
  child.stdin.write(lang + " " + util.inspect(dataAtom) + " " + exe);
});
out$.judge = judge = co.wrap(function*(lang, code, probConfig){
  var exePath, dataset, ref$, tasks, result;
  exePath = yield compile(lang, code);
  dataset = (ref$ = probConfig.dataset, delete probConfig.dataset, ref$);
  tasks = map(function(){
    return function(cb){
      return run(lang, exePath, import$(clone$(it), probConfig), cb);
    };
  })(
  dataset);
  result = yield async.parallelLimit(tasks, config.concurrency);
  return result;
});
function import$(obj, src){
  var own = {}.hasOwnProperty;
  for (var key in src) if (own.call(src, key)) obj[key] = src[key];
  return obj;
}
function clone$(it){
  function fun(){} fun.prototype = it;
  return new fun;
}