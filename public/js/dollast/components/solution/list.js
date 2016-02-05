// Generated by LiveScript 1.4.0
(function(){
  var createClass, connect, iconText, ref$, codeLink, probLink, userLink, rndLink, onGetSolutionsList, I, log, selector;
  createClass = require('react').createClass;
  connect = require('react-redux').connect;
  iconText = require('../elements').iconText;
  ref$ = require('../format'), codeLink = ref$.codeLink, probLink = ref$.probLink, userLink = ref$.userLink, rndLink = ref$.rndLink;
  onGetSolutionsList = require('../../actions').onGetSolutionsList;
  I = require('immutable');
  log = debug('dollast:component:solution:list');
  selector = function(state){
    return {
      sols: state.getIn(['db', 'solution', 'get'], I.fromJS([]))
    };
  };
  module.exports = connect(selector)(createClass({
    displayName: 'sol-list',
    componentWillMount: function(){
      return this.props.dispatch(onGetSolutionsList());
    },
    render: function(){
      var sols, sol;
      sols = this.props.sols.toJS();
      return _('div', null, _('h1', {
        className: "ui dividing header"
      }, 'status'), _('table', {
        className: "ui table segment large green selectable"
      }, _('thead', null, _('tr', null, _('th', {
        className: "collapsing right"
      }, "sol id"), _('th', null, 'problem'), _('th', null, 'user'), _('th', null, 'status'), _('th', null, 'score'), _('th', null, "time(s)"), _('th', null, "space(MB)"), _('th', {
        className: "collapsing"
      }, 'lang'), _('th', {
        className: "collapsing"
      }, 'round'))), _('tbody', null, (function(){
        var i$, ref$, len$, results$ = [];
        for (i$ = 0, len$ = (ref$ = sols).length; i$ < len$; ++i$) {
          sol = ref$[i$];
          results$.push(_('tr', {
            className: 'red',
            key: sol._id
          }, _('td', null, _(codeLink, {
            sid: sol._id
          })), _('td', null, _(probLink, {
            prob: sol.prob
          })), _('td', null, _(userLink, {
            user: sol.user
          })), _('td', null, sol.final.status), _('td', null, sol.final.score), _('td', null, sol.final.time), _('td', null, sol.final.space), _('td', null, sol.lang), _('td', null, sol.round != null ? _(rndLink, {
            rnd: sol.round,
            noTitle: true
          }) : null)));
        }
        return results$;
      }()))), _(iconText, {
        className: "floated right primary",
        text: 'refresh',
        icon: 'refresh',
        onClick: this.refresh
      }));
    }
  }));
}).call(this);
