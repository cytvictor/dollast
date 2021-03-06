// Generated by LiveScript 1.4.0
(function(){
  var createClass, connect, onSubmitSolution, ref$, field, labelField, dropdown, iconText, I, log, selector;
  createClass = require('react').createClass;
  connect = require('react-redux').connect;
  onSubmitSolution = require('../../actions').onSubmitSolution;
  ref$ = require('../elements'), field = ref$.field, labelField = ref$.labelField, dropdown = ref$.dropdown, iconText = ref$.iconText;
  I = require('immutable');
  log = debug('dollast:component:solution:submit');
  selector = function(state){
    return {
      uid: state.getIn(['session', 'uid'], "guest"),
      permit: {
        owner: state.getIn(['session', 'uid']),
        group: 'solutions',
        access: 420
      }
    };
  };
  module.exports = connect(selector)(createClass({
    displayName: 'sol-submit',
    componentDidMount: function(){
      var $form, ref$;
      $form = $('#solution-submit');
      $form.form({
        on: 'blur',
        fields: {
          code: {
            identifier: 'code',
            rules: [
              {
                type: 'minLength[4]',
                prompt: 'code minimum length is 4'
              }, {
                type: 'maxLength[65535]',
                prompt: 'code length cannot exceed 65535'
              }
            ]
          },
          lang: {
            identifier: 'lang',
            rules: [{
              type: 'empty',
              prompt: 'language cannot be empty'
            }]
          },
          owner: 'isUserId',
          group: 'isUserId',
          access: 'isAccess'
        },
        onSuccess: this.submit,
        inline: true
      });
      $form.form('set values', {
        owner: (ref$ = this.props.permit).owner,
        group: ref$.group
      });
      return $form.form('set values', {
        access: this.props.permit.access.toString(8)
      });
    },
    submit: function(e){
      var $form, allValues, permit, data, callback, this$ = this;
      e.preventDefault();
      $form = $('#solution-submit');
      allValues = $form.form('get values');
      permit = {
        owner: allValues.owner,
        group: allValues.group,
        acces: allValues.acces
      };
      permit.access = parseInt(permit.access, 8);
      data = Object.assign({
        pid: this.props.params.pid,
        uid: this.props.uid
      }, {
        code: allValues.code,
        lang: allValues.lang
      });
      callback = function(){
        return this$.props.history.push('#/solution');
      };
      return this.props.dispatch(onSubmitSolution(data, callback));
    },
    render: function(){
      return _('div', {
        className: "ui form segment relaxed",
        id: 'solution-submit'
      }, _(field, null, _('h1', {
        className: "header divided"
      }, "problem: " + this.props.params.pid)), _('div', {
        className: "ui success message"
      }, _('div', {
        className: "header"
      }, "Submit successful. Redirect to status in 3 seconds...")), _(labelField, {
        text: 'code'
      }, _('textarea', {
        name: 'code'
      })), _('div', {
        className: "ui two fields"
      }, _(labelField, {
        text: 'language'
      }, _(dropdown, {
        className: 'selection',
        name: 'lang',
        'default': "please select your language",
        options: {
          'cpp': 'cpp',
          'pas': 'pas',
          'java': 'java'
        }
      }))), _('h2', {
        className: "ui dividing header"
      }, 'permission'), _('div', {
        className: "ui four fields"
      }, _(labelField, {
        text: 'owner'
      }, _('div', {
        className: "ui input"
      }, _('input', {
        name: 'owner',
        type: 'string'
      }))), _(labelField, {
        text: 'group'
      }, _('div', {
        className: "ui input"
      }, _('input', {
        name: 'group',
        type: 'string'
      }))), _(labelField, {
        text: 'access'
      }, _('div', {
        className: "ui input"
      }, _('input', {
        name: 'access',
        type: 'string'
      })))), _('div', {
        className: "ui field"
      }, _(iconText, {
        className: "primary floated submit",
        text: 'Submit',
        icon: 'rocket'
      })));
    }
  }));
}).call(this);
