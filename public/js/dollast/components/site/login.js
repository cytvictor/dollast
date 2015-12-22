// Generated by LiveScript 1.3.1
(function(){
  var createClass, connect, E, A, log;
  createClass = require('react').createClass;
  connect = require('react-redux').connect;
  E = require('../elements');
  A = require('../../actions');
  log = debug('dollast:component:login');
  module.exports = connect()(createClass({
    displayName: 'login',
    componentDidMount: function(){
      return $('#login-form').form({
        on: 'blur',
        fields: {
          uid: {
            identifier: 'uid',
            rules: [
              {
                type: 'minLength[6]',
                prompt: "User name must be longer than 5"
              }, {
                type: 'maxLength[16]',
                prompt: "User name must be shorter than 15"
              }
            ]
          },
          pswd: {
            identifier: 'pswd',
            rules: [
              {
                type: 'minLength[6]',
                prompt: 'password length must be longer than 5'
              }, {
                type: 'maxLength[16]',
                prompt: 'password length must be shorter than 15'
              }
            ]
          }
        },
        onSuccess: this.submit,
        debug: true
      });
    },
    submit: function(e){
      var $form;
      e.preventDefault();
      $form = $('#login-form');
      return this.props.dispatch(A.onLogin($form.form('get values')));
    },
    render: function(){
      return _('div', {
        className: "ui"
      }, _('h1', {
        className: "ui dividing header"
      }, "Login"), _('form', {
        className: "ui form segment relaxed",
        id: "login-form"
      }, _(E.field, null, _(E.iconInput, {
        className: "left",
        icon: 'user',
        input: {
          placeholder: "user id",
          name: "uid"
        }
      })), _(E.field, null, _(E.iconInput, {
        className: "left",
        icon: 'lock',
        input: {
          placeholder: 'password',
          name: "pswd",
          type: 'password'
        }
      })), _(E.iconText, {
        className: "left primary labeled submit",
        icon: "sign in",
        text: 'Login'
      }), _('div', {
        className: "ui error message"
      })));
    }
  }));
}).call(this);