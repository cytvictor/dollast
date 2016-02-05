// Generated by LiveScript 1.4.0
(function(){
  var reflux, co, actions, pubKey, RSAEnc, AESDec, store, out$ = typeof exports != 'undefined' && exports || this;
  reflux = require('reflux');
  co = require('co');
  out$.actions = actions = reflux.createActions(['login', 'logout', 'register', 'loadToken']);
  pubKey = '-----BEGIN PUBLIC KEY-----\nMIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCV8qwyGUz1mKUNyMUXIb5THUYJ\n9Xf9WgL/GC5UeVon7JKtzeWXRSCmzxlO5XD4GD8zcJ728kNfABdizPQ1HG4MFfRc\ns5vPQDiIR23dafkGODmE039aKRiTc+xxrLgx3huasFan+2yG/tiFQbXEFfAmLaal\n6FuOukBTwitq0XBdiQIDAQAB\n-----END PUBLIC KEY-----';
  RSAEnc = forge.pki.publicKeyFromPem(pubKey);
  AESDec = function(cipher, key){
    var iv, decipher;
    iv = forge.util.hexToBytes(key.substr(32));
    key = forge.util.hexToBytes(key.substr(0, 32));
    decipher = forge.cipher.createDecipher('AES-CBC', key);
    decipher.start({
      iv: iv
    });
    decipher.update(forge.util.createBuffer(forge.util.hexToBytes(cipher)));
    decipher.finish();
    return decipher.output.data;
  };
  out$.store = store = reflux.createStore({
    listenables: actions,
    genNewClientKey: function(){
      return forge.util.bytesToHex(forge.random.getBytesSync(32));
    },
    getClientKey: function(){
      var clientKey;
      clientKey = localStorage.clientKey;
      if (!clientKey) {
        clientKey = this.genNewClientKey();
        localStorage.clientKey = clientKey;
      }
      return clientKey;
    },
    setJwt: function(token){
      var oldSettings;
      oldSettings = $.ajaxSetup();
      return $.ajaxSetup(importAll$(oldSettings, {
        headers: {
          Authorization: "Bearer " + token
        }
      }));
    },
    getInitialState: function(){
      return {
        uid: ""
      };
    },
    onLoadToken: function(){
      var token, jwtStruct, payload;
      token = localStorage.token;
      if (token) {
        this.setJwt(token);
        jwtStruct = token.split('.');
        while (jwtStruct[1].length % 3 !== 0) {
          jwtStruct[1] += "=";
        }
        payload = JSON.parse(forge.util.decode64(jwtStruct[1] + "="));
        this.state = JSON.parse(AESDec(payload.client, this.getClientKey()));
        return this.trigger(this.state);
      }
    },
    jwtEncode: function(header, payload, key){
      var header64, payload64, unsignedToken, h, signature64, ret;
      if ('string' !== typeof header) {
        header = JSON.stringify(header);
      }
      if ('string' !== typeof payload) {
        payload = JSON.stringify(payload);
      }
      header64 = forge.util.encode64(header);
      payload64 = forge.util.encode64(payload);
      unsignedToken = header64 + "." + payload64;
      h = forge.hmac.create();
      h.start('sha256', key);
      h.update(unsignedToken);
      signature64 = forge.util.encode64(forge.util.hexToBytes(h.digest().toHex()));
      ret = (unsignedToken + "." + signature64).replace(/\//g, '_').replace(/\+/g, '-').replace(/\=/g, '');
      return ret;
    },
    clientSign: function(data){
      var clientKey, payload, header;
      clientKey = this.getClientKey();
      payload = {
        content: forge.util.encode64(RSAEnc.encrypt(JSON.stringify(importAll$(data, {
          clientKey: clientKey
        }))))
      };
      header = {
        alg: 'HS256',
        typ: 'JWT'
      };
      return {
        signed: this.jwtEncode(header, payload, clientKey)
      };
    },
    onLogin: co.wrap(function*(info){
      var ret;
      console.log("store received", info);
      ret = (yield $.post('/site/login', this.clientSign(info)));
      console.log(ret);
      localStorage.token = ret.token;
      return actions.loadToken();
    }),
    onRegister: co.wrap(function*(info){
      var ret;
      ret = (yield $.post('/user/register', this.clientSign(info)));
      return console.log("return:", ret);
    }),
    onLogout: function(){
      delete localStorage.token;
      return this.setState({
        uid: ""
      });
    }
  });
  function importAll$(obj, src){
    for (var key in src) obj[key] = src[key];
    return obj;
  }
}).call(this);
