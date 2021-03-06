// Generated by LiveScript 1.4.0
(function(){
  var createClass, connect, fromJS, ref$, dropdown, iconText, loadingSegment, rndLink, roundTime, onGetRoundsList, classnames, log, selector;
  createClass = require('react').createClass;
  connect = require('react-redux').connect;
  fromJS = require('immutable').fromJS;
  ref$ = require('../elements'), dropdown = ref$.dropdown, iconText = ref$.iconText, loadingSegment = ref$.loadingSegment;
  ref$ = require('../format'), rndLink = ref$.rndLink, roundTime = ref$.roundTime;
  onGetRoundsList = require('../../actions').onGetRoundsList;
  classnames = require('classnames');
  log = debug('dollast:component:round:list');
  selector = function(state, props){
    return {
      rounds: state.getIn(['db', 'round', 'get'], fromJS([])),
      status: state.getIn(['status', 'round', 'get'], 'init')
    };
  };
  module.exports = connect(selector)(createClass({
    displayName: 'rnd-list',
    filter: function(value, text, $choice){
      return log({
        value: value,
        text: text,
        $choice: $choice
      });
    },
    componentDidMount: function(){
      var $filter;
      this.props.dispatch(onGetRoundsList());
      $filter = $('.dropdown');
      $filter.dropdown({
        on: 'hover',
        onChange: this.filter
      });
      return $filter.dropdown('set text', 'all');
    },
    render: function(){
      var rounds, rnd;
      rounds = this.props.rounds.toJS();
      return _('div', null, _('div', {
        className: 'ui'
      }, _('h1', {
        className: "ui header dividing"
      }, 'rounds'), _(dropdown, {
        className: "floated pointing button labeled icon",
        name: 'filter',
        'default': "please select filter",
        options: {
          'all': 'all',
          'past': 'past',
          'running': 'running',
          'pending': 'pending'
        }
      }), _(iconText, {
        className: "launch primary right floated",
        text: 'create',
        icon: 'plus',
        href: '#/round/create'
      })), _(loadingSegment, {
        status: this.props.status
      }, _('div', {
        className: "ui divided link list"
      }, (function(){
        var i$, ref$, len$, results$ = [];
        for (i$ = 0, len$ = (ref$ = rounds).length; i$ < len$; ++i$) {
          rnd = ref$[i$];
          results$.push(_('div', {
            className: "item",
            key: "round/" + rnd._id
          }, _('div', {
            className: "ui right floated"
          }, _(roundTime, {
            begTime: rnd.begTime,
            endTime: rnd.endTime
          })), _('div', {
            className: 'description'
          }, _(rndLink, {
            rnd: rnd
          }))));
        }
        return results$;
      }()))));
    }
  }));
}).call(this);
