// Generated by LiveScript 1.3.1
(function(){
  var supertest, mocha, app, _it, request;
  supertest = require('supertest');
  mocha = require('mocha');
  app = require('../bin/server');
  _it = it;
  request = supertest.agent(app.listen());
  describe("hello world", function(){
    return describe("when GET /", function(){
      return _it("should ..?", function(done){
        return request.get('/').expect(/script/, done);
      });
    });
  });
}).call(this);