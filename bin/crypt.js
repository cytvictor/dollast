// Generated by LiveScript 1.4.0
(function(){
  var nodeForge, debug, koaJwt, _, config, log, privKey, pubKey, RSAEnc, RSADec, ref$, out$ = typeof exports != 'undefined' && exports || this;
  nodeForge = require('node-forge');
  debug = require('debug');
  koaJwt = require('koa-jwt');
  _ = require('prelude-ls');
  config = require('./config');
  log = debug("dollast:encrypt");
  privKey = '-----BEGIN RSA PRIVATE KEY-----\nMIICWwIBAAKBgQCV8qwyGUz1mKUNyMUXIb5THUYJ9Xf9WgL/GC5UeVon7JKtzeWX\nRSCmzxlO5XD4GD8zcJ728kNfABdizPQ1HG4MFfRcs5vPQDiIR23dafkGODmE039a\nKRiTc+xxrLgx3huasFan+2yG/tiFQbXEFfAmLaal6FuOukBTwitq0XBdiQIDAQAB\nAoGAZfrxmfETIkV6m/Fb+et9IdHa/JLx1GEPgKbVe6Y85sJCz+okp8jf+BMJx1rM\nhi8XbMi/lHwXzdimDxANVsHLJWWbydu7PfcNS5EjQpWJgrEb4bdg0Tkyk5Baj5tr\nLwOw9lzY7uOem6kJaKCBcNKJet7nSjoO23zODifxQFmrOjECQQDtqwbdBEeVk8jF\nvY8XBdSWbkKwHN7yQpPgnwQ5VdDP9MkZYieAdZGRGkXn1Q6xRG562ASbd8Xo7yjI\nmV7bHOkfAkEAoYOIG7bs/fOmIRbo45I4EprV9SV1b6blqrNo3hUx/OXzfS6ml1Q8\nz6cIuxG0YexzTW7kAmDwMncsRd7qkGpcVwJAKaKxhByQ0dJe9M09eQILeQL96c5U\n/EnPkCUrX0P6XcP7StgYJXfzNWFN58w6U7GyTRD01auI30KueV3s8SPCbwJAen5v\nM9XAV7n6PQ5LAo1ayYF007/dGRjTBmubFROuHceoq0A+SHcyx6o/DOGYlMvnhsqb\nUtKCWUPY6ATwkSaZcQJAF+aQSxmuI6tLztjwxgzq0ZpaM5iKZQFAzNEUVB8DXG46\nAO4I2wqKqyCspNQOkqGu1cTtsCvMsnrOGy4UfDPKWA==\n-----END RSA PRIVATE KEY-----';
  pubKey = '-----BEGIN PUBLIC KEY-----\nMIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCV8qwyGUz1mKUNyMUXIb5THUYJ\n9Xf9WgL/GC5UeVon7JKtzeWXRSCmzxlO5XD4GD8zcJ728kNfABdizPQ1HG4MFfRc\ns5vPQDiIR23dafkGODmE039aKRiTc+xxrLgx3huasFan+2yG/tiFQbXEFfAmLaal\n6FuOukBTwitq0XBdiQIDAQAB\n-----END PUBLIC KEY-----';
  RSAEnc = nodeForge.pki.publicKeyFromPem(pubKey);
  RSADec = nodeForge.pki.privateKeyFromPem(privKey);
  ref$ = out$;
  ref$.RSA = {
    dec: function(data){
      return JSON.parse(RSADec.decrypt(nodeForge.util.decode64(data)));
    },
    enc: function(data){
      log(RSAEnc.encrypt("fdaf"));
      return nodeForge.util.encode64(RSAEnc.encrypt(JSON.stringify(data)));
    }
  };
  ref$.AES = {
    enc: function(plain, key){
      var iv, cipher, encrypted;
      iv = nodeForge.util.hexToBytes(key.substr(32));
      key = nodeForge.util.hexToBytes(key.substr(0, 32));
      cipher = nodeForge.cipher.createCipher('AES-CBC', key);
      cipher.start({
        iv: iv
      });
      cipher.update(nodeForge.util.createBuffer(plain));
      cipher.finish();
      encrypted = cipher.output;
      return encrypted.toHex();
    },
    dec: function(cipher, key){
      var iv, decipher;
      iv = nodeForge.util.hexToBytes(key.substr(32));
      key = nodeForge.util.hexToBytes(key.substr(0, 32));
      decipher = nodeForge.cipher.createDecipher('AES-CBC', key);
      decipher.start({
        iv: iv
      });
      decipher.update(nodeForge.util.createBuffer(nodeForge.util.hexToBytes(cipher)));
      decipher.finish();
      return decipher.output.data;
    }
  };
}).call(this);
