// Generated by LiveScript 1.4.0
(function(){
  var createClass, connect, I, ref$, statistics, iconText, probLink, onGetProblemStat, sortWith, average, map, log, selector, generateStat;
  createClass = require('react').createClass;
  connect = require('react-redux').connect;
  I = require('immutable');
  ref$ = require('../elements'), statistics = ref$.statistics, iconText = ref$.iconText;
  probLink = require('../format').probLink;
  onGetProblemStat = require('../../actions').onGetProblemStat;
  ref$ = require('prelude-ls'), sortWith = ref$.sortWith, average = ref$.average, map = ref$.map;
  log = debug('dollast:component:problem:stat');
  selector = function(state, props){
    var pid;
    pid = props.params.pid;
    return {
      sols: state.getIn(['db', 'problem', pid, 'stat', 'get', 'sols'], I.fromJS([])),
      prob: state.getIn(['db', 'problem', pid, 'stat', 'get', 'prob'], I.fromJS({
        _id: 0
      }))
    };
  };
  generateStat = function(sols){
    var scores, res$, i$, len$, sol, mean, median, variance, stddev;
    if (sols.length === 0) {
      return {
        solved: 0,
        mean: 0,
        median: 0,
        stddev: 0
      };
    }
    res$ = [];
    for (i$ = 0, len$ = sols.length; i$ < len$; ++i$) {
      sol = sols[i$];
      res$.push(sol.doc.final.score || 0);
    }
    scores = res$;
    mean = average(scores);
    median = scores[scores.length / 2];
    variance = average(map(function(it){
      return it * it;
    }, scores)) - mean * mean;
    stddev = Math.sqrt(variance);
    return {
      solved: sols.length,
      mean: mean,
      median: median,
      stddev: stddev
    };
  };
  module.exports = connect(selector)(createClass({
    displayName: 'prob-stat',
    componentDidMount: function(){
      return this.props.dispatch(onGetProblemStat(this.props.params.pid));
    },
    render: function(){
      var pid, sols, stat;
      pid = this.props.params.pid;
      sols = this.props.sols.toJS();
      stat = generateStat(sols);
      return _('div', null, _('h1', {
        className: "ui header dividing"
      }, "Statistics for Problem " + pid), _(probLink, {
        prob: this.props.prob.toJS()
      }), _('h3', {
        className: "ui header dividing"
      }, "numbers"), _(statistics, {
        stat: {
          "accepted users": stat.solved,
          mean: stat.mean,
          median: stat.median,
          "standard deviation": stat.stddev
        }
      }));
    }
  }));
}).call(this);
