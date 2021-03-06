// Generated by LiveScript 1.4.0
(function(){
  var createClass, connect, ref$, iconText, labelField, dropdown, iconInput, field, loading, I, join, privileges, onGetUserProfile, onUpdateUser, log, selector;
  createClass = require('react').createClass;
  connect = require('react-redux').connect;
  ref$ = require('../elements'), iconText = ref$.iconText, labelField = ref$.labelField, dropdown = ref$.dropdown, iconInput = ref$.iconInput, field = ref$.field;
  loading = require('../loading').loading;
  I = require('immutable');
  join = require('prelude-ls').join;
  privileges = require('../../utils/privileges');
  ref$ = require('../../actions'), onGetUserProfile = ref$.onGetUserProfile, onUpdateUser = ref$.onUpdateUser;
  log = debug('dollast:components:user:modify');
  selector = function(state, props){
    return {
      user: state.getIn(['db', 'user', props.params.uid, 'get'], I.fromJS({
        profile: {
          groups: []
        },
        solvedProblems: [],
        ownedProblems: [],
        ownedRounds: []
      }))
    };
  };
  module.exports = connect(selector)(createClass({
    displayName: 'user-modify',
    submit: function(e){
      var $form, ref$, privileges, oldPassword, newPassword, confirmPassword, desc, groups, _id, updated;
      e.preventDefault();
      $form = $('#form-user');
      ref$ = $form.form('get values'), privileges = ref$.privileges, oldPassword = ref$.oldPassword, newPassword = ref$.newPassword, confirmPassword = ref$.confirmPassword, desc = ref$.desc;
      groups = privileges.split(',');
      _id = this.props.params.uid;
      if (oldPassword === "" || newPassword === "") {
        updated = {
          _id: _id,
          groups: groups,
          desc: desc
        };
      } else {
        updated = {
          _id: _id,
          groups: groups,
          desc: desc,
          oldPassword: oldPassword,
          newPassword: newPassword
        };
      }
      return this.props.dispatch(onUpdateUser(this.props.params.uid, updated));
    },
    componentDidMount: function(){
      var $form;
      this.props.dispatch(onGetUserProfile(this.props.params.uid));
      $form = $('#form-user');
      return $form.form({
        onSuccess: this.submit,
        on: 'blur',
        fields: {
          oldPassword: {
            identifier: 'oldPassword',
            optional: true,
            rules: 'isPassword'
          },
          newPassword: {
            identifier: 'newPassword',
            optional: true,
            rules: 'isPassword'
          },
          confirmation: {
            identifier: 'confirmPassword',
            optional: true,
            rules: ['isPassword', "match[newPassword]"]
          }
        }
      });
    },
    componentWillUpdate: function(nextProps, nextState){
      var user, $form;
      user = nextProps.user.toJS();
      $form = $('#form-user');
      return $form.form('set values', {
        privileges: user.profile.groups
      });
    },
    render: function(){
      var user;
      user = this.props.user.toJS();
      return _('div', {
        className: "ui form",
        id: "form-user"
      }, _('h2', null, user.profile._id + ""), _(labelField, {
        text: 'privileges'
      }, _(dropdown, {
        className: "selection search multiple fluid",
        name: 'privileges',
        'default': "select proper access",
        options: privileges
      })), _('h3', {
        className: "ui dividing header"
      }, "Description"), _('div', {
        className: "ui two fields"
      }, _(labelField, {
        text: "describe yourself"
      }, _('textarea', {
        name: 'desc'
      }))), _('h3', {
        className: "ui dividing header"
      }, "Password"), _('div', {
        className: "four fields wide"
      }, _(labelField, {
        text: "old password"
      }, _(iconInput, {
        className: "left",
        icon: 'lock',
        input: {
          placeholder: "old password",
          name: 'oldPassword',
          type: 'password'
        }
      }))), _('div', {
        className: "four fields wide"
      }, _(labelField, {
        text: "new password"
      }, _(iconInput, {
        className: "left",
        icon: 'lock',
        input: {
          placeholder: "new password",
          name: 'newPassword',
          type: 'password'
        }
      }))), _('div', {
        className: "four fields wide"
      }, _(labelField, {
        text: "confirm new password"
      }, _(iconInput, {
        className: "left",
        icon: 'lock',
        input: {
          placeholder: "confirmation",
          name: 'confirmPassword',
          type: 'password'
        }
      }))), _(iconText, {
        className: "submit primary",
        icon: 'save',
        text: 'submit'
      }));
    }
  }));
}).call(this);
