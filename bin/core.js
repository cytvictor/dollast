// Generated by LiveScript 1.3.1
(function(){
  var async, util, fs, childProcess, tmp, bluebird, co, debug, path, _, config, log, compile, flattenDir, upload, genDataPairs, judgeResult, runAtom, judge, out$ = typeof exports != 'undefined' && exports || this;
  async = require('async');
  util = require('util');
  fs = require('mz/fs');
  childProcess = require('mz/child_process');
  tmp = require('tmp');
  bluebird = require('bluebird');
  co = require('co');
  debug = require('debug');
  path = require('path');
  _ = require('prelude-ls');
  config = require('./config');
  log = debug('core');
  out$.compile = compile = co.wrap(function*(tmpDir, lang, code){
    var srcPath, exePath, srcFile, compileCmd;
    srcPath = path.join(tmpDir("/main" + config.langSuffix[lang]));
    exePath = path.join(tmpDir("/main"));
    srcFile = fs.createWriteStream(srcPath);
    srcFile.write(code);
    compileCmd = config.compileFmt[lang](srcPath, exePath);
    log("compile-cmd " + compileCmd);
    yield childProcess.exec(compileCmd);
    return exePath;
  });
  flattenDir = function*(baseDir){
    var walk;
    walk = function*(dir){
      var files, i$, len$, file;
      files = fs.readdirSync(dir);
      for (i$ = 0, len$ = files.length; i$ < len$; ++i$) {
        file = files[i$];
        if (fs.statSync(file).isDirectory()) {
          walk(path.join(dir, file));
          fs.rmdir(dir);
        } else if (dir !== baseDir) {
          fs.renameSync;
        }
      }
    };
    walk(baseDir);
  };
  out$.upload = upload = co.wrap(function*(pid, part){
    var extName, zipFile, dataDir, ref$, stdout, stderr, err, ret;
    extName = path.extname(part.filename);
    zipFile = tmp.fileSync({
      postfix: extName
    });
    log("upload " + part.filename + " -> " + zipFile.name);
    try {
      part.pipe(fs.createWriteStream(zipFile.name));
      dataDir = path.join(config.dataDir, "/" + pid);
      ref$ = yield childProcess.exec("7z e " + zipFile.name + " -o" + dataDir + " -y"), stdout = ref$[0], stderr = ref$[1];
      log("output: " + stdout + " " + stderr);
      flattenDir(dataDir);
    } catch (e$) {
      err = e$;
      ret = {
        status: "decompressing error"
      };
    } finally {
      zipFile.removeCallback();
      ret = {
        status: "OK"
      };
    }
    log("unzip status: " + util.inspect(ret));
    return ret;
  });
  out$.genDataPairs = genDataPairs = co.wrap(function*(pid){
    var dataDir, files, pairs, i$, len$, inf, infPath, ouf;
    dataDir = path.join(config.dataDir, "/" + pid + "/");
    files = fs.readdirSync(dataDir);
    log("files: " + files);
    pairs = [];
    for (i$ = 0, len$ = files.length; i$ < len$; ++i$) {
      inf = files[i$];
      infPath = path.join(dataDir, inf);
      if (".in" === path.extname(inf)) {
        ouf = _.take(inf.length - 2, inf);
        ouf = ouf + "out";
        if (yield fs.exists(path.join(dataDir, ouf))) {
          log("find a pair: " + inf + " => " + ouf);
          pairs.push({
            input: inf,
            output: ouf
          });
        }
      }
    }
    return pairs;
  });
  judgeResult = co.wrap(function*(pid, inFile, outFile, ansFile, config){
    var judger, result;
    judger = (function(){
      switch (config.judger) {
      case 'string':
        return path.join(config.judgerDir, "/string");
      case 'real':
        return path.join(config.judgerDir, "/real");
      case 'strict':
        return path.join(config.judgerDir, "/strict");
      case 'custom':
        return path.join(config.dataDir, "/" + pid + "/", "/judge");
      default:
        throw Error('unimplemented');
      }
    }());
    result = yield childProcess.exec(judger + " " + inFile + " " + outFile + " " + ansFile);
    return JSON.parse(result);
  });
  out$.runAtom = runAtom = co.wrap(function*(pid, lang, exePath, config, callback){
    var ref$, ouf, inf, ans, proc, exeRes, judgeRes;
    ref$ = yield tmp.file, ouf = ref$[0], callback = ref$[1];
    inf = path.join(config.dataDir, "/" + pid + "/", config.input);
    ans = path.join(config.dataDir, "/" + pid + "/", config.output);
    proc = yield childProcess.exec(config.sandboxer + " " + exePath + "" + config.timeLmt + " " + config.spaceLmt + " " + config.stkLmt + " " + config.outLmt + " " + inf + " " + ouf);
    exeRes = JSON.parse(proc);
    if (exeRes.status !== 'OK') {
      return exeRes;
    }
    judgeRes = yield judgeResult(pid, inf, ouf, ans);
    return import$(exeRes, judgeRes);
  });
  out$.judge = judge = co.wrap(function*(lang, code, probConfig, doc){
    var ref$, tmpDir, cleanUp, exePath, dataset, tasks, results, err;
    ref$ = yield tmp.dir, tmpDir = ref$[0], cleanUp = ref$[1];
    try {
      exePath = yield compile(tmpDir, lang, code);
      dataset = (ref$ = probConfig.dataset, delete probConfig.dataset, ref$);
      tasks = map(function(){
        return function(callback){
          return runAtom(pid, lang, exePath, import$(clone$(it), probConfig), callback);
        };
      })(
      dataset);
      results = yield async.parallelLimit(tasks, config.concurrency);
      console.log("judge results " + results);
    } catch (e$) {
      err = e$;
      throw err;
    } finally {
      cleanUp();
    }
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
}).call(this);
