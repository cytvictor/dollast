// Generated by LiveScript 1.3.1
(function(){
  var koaPassport, passportLocal, LocalStrategy, init, out$ = typeof exports != 'undefined' && exports || this;
  koaPassport = require('koa-passport');
  passportLocal = require('passport-local');
  LocalStrategy = passportLocal.Strategy;
  koaPassport.serializeUser(function(user, done){
    return done(null, user);
  });
  out$.init = init = function(db){
    koaPassport.deserializeUser(function(id, done){
      console.log("deserialize! " + id);
      return db.user.model.findById(id, function(err, user){
        return done(err, user);
      });
    });
    return koaPassport.use(new LocalStrategy(function(uid, pswd, done){
      console.log("Login: " + uid + " " + pswd + " " + util.inspect(this.session));
      return db.user.query(uid, pswd, done);
    }));
  };
}).call(this);
