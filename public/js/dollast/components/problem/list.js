// Generated by LiveScript 1.4.0
(function(){
  var createClass, connect, onRefreshProblemList, ref$, iconText, tabMenu, dropdown, loadingSegment, probLink, fromJS, classnames, log, linkList, selector;
  createClass = require('react').createClass;
  connect = require('react-redux').connect;
  onRefreshProblemList = require('../../actions').onRefreshProblemList;
  ref$ = require('../elements'), iconText = ref$.iconText, tabMenu = ref$.tabMenu, dropdown = ref$.dropdown, loadingSegment = ref$.loadingSegment;
  probLink = require('../format').probLink;
  fromJS = require('immutable').fromJS;
  classnames = require('classnames');
  log = debug('dollast:component:problem:list');
  linkList = createClass({
    displayName: 'link-list',
    render: function(){
      var elem;
      return _('div', {
        className: "ui divided link list"
      }, (function(){
        var i$, ref$, len$, results$ = [];
        for (i$ = 0, len$ = (ref$ = this.props.list).length; i$ < len$; ++i$) {
          elem = ref$[i$];
          results$.push(_('a', {
            className: "item",
            href: elem.href,
            key: elem.href
          }, _('div', {
            className: "ui left floated icon"
          }, _('i', {
            className: "icon check"
          }), _('i', {
            className: "icon remove"
          })), _('div', {
            className: "ui right floated"
          }, elem.right), _('div', {
            className: 'description'
          }, elem.desc)));
        }
        return results$;
      }.call(this)));
    }
  });
  selector = function(state){
    var defaultProp;
    defaultProp = fromJS({
      status: 'ok',
      data: []
    });
    return {
      problems: defaultProp.mergeDeep(state.getIn(['db', 'problem', 'get']))
    };
  };
  module.exports = connect(selector)(createClass({
    displayName: 'prob-list',
    filter: function(value, text, $choice){
      return log({
        value: value,
        text: text,
        $choice: $choice
      });
    },
    componentDidMount: function(){
      var $filter;
      this.props.dispatch(onRefreshProblemList());
      $filter = $('.dropdown');
      $filter.dropdown({
        on: 'hover',
        onChange: this.filter
      });
      return $filter.dropdown('set text', 'all');
    },
    render: function(){
      var ref$, status, problems, prob, id;
      ref$ = this.props.problems.toJS(), status = ref$.status, problems = ref$.data;
      log({
        status: status,
        problems: problems
      });
      return _('div', {
        className: "ui"
      }, _('h1', {
        className: "ui header dividing"
      }, "problem list"), _(dropdown, {
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
        className: "right floated primary labeled",
        href: '#/problem/create',
        text: 'create',
        icon: 'plus'
      }), _(loadingSegment, status, _('div', {
        className: "ui very relaxed divided link list"
      }, (function(){
        var i$, ref$, len$, results$ = [];
        for (i$ = 0, len$ = (ref$ = problems).length; i$ < len$; ++i$) {
          prob = ref$[i$];
          id = prob._id;
          results$.push(_('div', {
            className: "item",
            key: "problem/" + id
          }, _('div', {
            className: "ui right floated"
          }, "??"), _('div', {
            className: 'description'
          }, _(probLink, {
            prob: prob
          }))));
        }
        return results$;
      }()))));
    }
  }));
}).call(this);
