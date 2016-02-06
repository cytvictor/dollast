// Generated by LiveScript 1.4.0
(function(){
  var createClass, connect, ref$, onLogout, onLoadFromToken, navbar, footer, log, mapStateToProps;
  createClass = require('react').createClass;
  connect = require('react-redux').connect;
  ref$ = require('../actions'), onLogout = ref$.onLogout, onLoadFromToken = ref$.onLoadFromToken;
  navbar = require('../components/site/navbar');
  footer = require('../components/site/footer');
  log = debug('dollast:component:app');
  mapStateToProps = function(state){
    return {
      session: state.get('session')
    };
  };
  module.exports = connect(mapStateToProps)(createClass({
    displayName: 'dollast',
    componentWillMount: function(){
      return this.props.dispatch(onLoadFromToken(localStorage.token));
    },
    render: function(){
      var dispatch;
      dispatch = this.props.dispatch;
      return _('div', {
        className: "ui grid"
      }, _(navbar, {
        uid: this.props.session.get('uid'),
        onLogout: function(){
          return dispatch(onLogout());
        }
      }), _('div', {
        className: "row"
      }, _('div', {
        className: "three wide column"
      }), _('div', {
        className: "ten wide column"
      }, this.props.children)), _('div', {
        className: "row"
      }, _(footer)));
    }
  }));
}).call(this);
