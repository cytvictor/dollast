// Generated by LiveScript 1.4.0
(function(){
  var R, E, V, reflux;
  R = require('react');
  E = require('../elements');
  V = require('../../stores/events');
  reflux = require('reflux');
  module.exports = R.createClass({
    mixins: [reflux.connect(V.store, "events")]
  }, 'display-name:', 'events-list', {
    render: function(){}
  });
}).call(this);
