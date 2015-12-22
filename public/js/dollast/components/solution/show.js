// Generated by LiveScript 1.3.1
(function(){
  var createClass, connect, iconText, onGetSolution, U, I, highlight, log, selector;
  createClass = require('react').createClass;
  connect = require('react-redux').connect;
  iconText = require('../elements').iconText;
  onGetSolution = require('../../actions').onGetSolution;
  U = require('../utils');
  I = require('immutable');
  highlight = require('react-highlight');
  log = debug('dollast:component:solution:show');
  selector = function(state){
    return {
      sol: state.getIn(['solution', 'show'], I.fromJS({
        final: {},
        results: []
      }))
    };
  };
  module.exports = connect(selector)(createClass({
    displayName: 'sol-show',
    componentWillMount: function(){
      return this.props.dispatch(onGetSolution(this.props.params.sid));
    },
    render: function(){
      var sol, result;
      sol = this.props.sol.toJS();
      return _('div', null, _('h3', {
        className: "ui header"
      }, "author: " + sol.user), _('h3', {
        className: "ui header"
      }, "lang: " + sol.lang), _('h3', {
        className: "ui header"
      }, "problem:", _('span', null, sol.prob)), (function(){
        switch (sol.final.status) {
        case 'private':
          return _('p', null, "this code is private");
        case 'CE':
          return _('div', null, _('p', null, "compile message:"), _('pre', null, sol.final.message));
        case 'running':
          return _('div', {
            className: 'ui'
          }, 'running');
        default:
          return _('div', null, _('div', {
            className: "ui toggle checkbox"
          }, _('input', {
            type: 'checkbox'
          }), _('label', "Current state: " + (open ? 'public' : 'private'))), _('div', {
            className: 'ui'
          }, _('h1', {
            className: "ui header dividing"
          }, 'details'), _('table', {
            className: "ui table segment"
          }, _('thead', null, _('tr', null, _('th', null, 'input'), _('th', null, 'status'), _('th', null, 'time'), _('th', null, 'space'), _('th', null, 'score'), _('th', null, 'message'))), _('tbody', null, (function(){
            var i$, ref$, len$, results$ = [];
            for (i$ = 0, len$ = (ref$ = sol.results).length; i$ < len$; ++i$) {
              result = ref$[i$];
              results$.push(_('tr', {
                className: 'positive',
                key: result.input
              }, _('td', null, result.input), _('td', null, result.status), _('td', null, result.time), _('td', null, result.space), _('td', null, result.score), _('td', null, result.message)));
            }
            return results$;
          }())), _('tfoot', null, _('tr', null, _('th', null, 'final result'), _('th', null, sol.final.status), _('th', null, sol.final.time), _('th', null, sol.final.space), _('th', null, sol.final.score), _('th', null, sol.final.message))))));
        }
      }()), _('h1', {
        className: "ui header dividing"
      }, 'code'), _('pre', null, _(highlight, {
        className: sol.lang
      }, sol.code)));
    }
  }));
}).call(this);
