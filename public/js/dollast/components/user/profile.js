// Generated by LiveScript 1.4.0
(function(){
  var createClass, connect, I, ref$, iconText, labelSegment, roundTime, rndLink, probLink, onGetUserProfile, privileges, log, selector;
  createClass = require('react').createClass;
  connect = require('react-redux').connect;
  I = require('immutable');
  ref$ = require('../elements'), iconText = ref$.iconText, labelSegment = ref$.labelSegment;
  ref$ = require('../format'), roundTime = ref$.roundTime, rndLink = ref$.rndLink, probLink = ref$.probLink;
  onGetUserProfile = require('../../actions').onGetUserProfile;
  privileges = require('../../utils/privileges');
  log = debug('dollast:component:user:profile');
  selector = function(state, props){
    var uid, that;
    uid = (that = props.params.uid)
      ? that
      : state.getIn(['session', 'uid']);
    return {
      uid: uid,
      user: state.getIn(['db', 'user', uid, 'get'], I.fromJS({
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
    displayName: 'user-show',
    componentDidMount: function(){
      return this.props.dispatch(onGetUserProfile(this.props.uid));
    },
    render: function(){
      var uid, user, ref$, group, prob, rnd;
      uid = this.props.uid;
      user = this.props.user.toJS();
      return _('div', null, _('h1', {
        className: "ui dividing header"
      }, "Details of " + uid), _(labelSegment, {
        text: "registered since"
      }), _('div', {
        className: "ui segment"
      }, _('div', {
        className: "ui large top attached label"
      }, "description"), _('div', null, (ref$ = user.profile) != null ? ref$.desc : void 8)), _(labelSegment, {
        text: "Groups"
      }, _('div', {
        className: "ui relaxed ivided link list"
      }, (function(){
        var i$, ref$, len$, results$ = [];
        for (i$ = 0, len$ = (ref$ = user.profile.groups).length; i$ < len$; ++i$) {
          group = ref$[i$];
          results$.push(_('div', {
            className: 'item',
            key: group
          }, _('div', {
            className: 'description'
          }, privileges[group])));
        }
        return results$;
      }()))), _(labelSegment, {
        text: "Problems solved"
      }, _('div', null, JSON.stringify(user.solvedProblems) + "")), _(labelSegment, {
        text: "Problems owned"
      }, _('div', {
        className: "ui very relaxed divided link list"
      }, (function(){
        var i$, ref$, len$, results$ = [];
        for (i$ = 0, len$ = (ref$ = user.ownedProblems).length; i$ < len$; ++i$) {
          prob = ref$[i$];
          results$.push(_('div', {
            className: "item",
            key: "problem/" + prob._id
          }, _('div', {
            className: 'description'
          }, _(probLink, {
            prob: prob
          }))));
        }
        return results$;
      }()))), _(labelSegment, {
        text: "Rounds owned"
      }, _('div', {
        className: "ui very relaxed divided link list"
      }, (function(){
        var i$, ref$, len$, results$ = [];
        for (i$ = 0, len$ = (ref$ = user.ownedRounds).length; i$ < len$; ++i$) {
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
      }()))), _(iconText, {
        className: "primary",
        icon: 'edit',
        text: 'modify',
        href: "#/user/" + uid + "/modify"
      }));
    }
  }));
}).call(this);
