// Generated by LiveScript 1.3.1
(function(){
  var createClass, ref$, getAttr, mergeProp, addClassName, classnames, moment, log, labeledIcon, iconText, iconInput, ui, field, tabMenu, labelField, dropdown, codeLink, probLink, rndLink, userLink, roundTime, out$ = typeof exports != 'undefined' && exports || this;
  createClass = require('react').createClass;
  ref$ = require('./utils'), getAttr = ref$.getAttr, mergeProp = ref$.mergeProp, addClassName = ref$.addClassName;
  classnames = require('classnames');
  moment = require('moment');
  log = debug('dollast:elements');
  out$.labeledIcon = labeledIcon = createClass({
    displayName: 'labeled-icon',
    render: function(){
      var aProps;
      aProps = getAttr(this.props, ['href', 'onClick', 'className', 'onValueChange']);
      aProps = mergeProp(aProps, {
        className: "item labeled"
      });
      return _('a', aProps, _('i', {
        className: "icon " + this.props.icon
      }), this.props.text);
    }
  });
  out$.iconText = iconText = createClass({
    displayName: "icon-button",
    render: function(){
      var aProps;
      aProps = getAttr(this.props, ['href', 'onClick', 'className', 'onValueChange']);
      aProps = mergeProp(aProps, {
        className: "ui icon button labeled"
      });
      return _('a', aProps, _('i', {
        className: "icon " + this.props.icon
      }), this.props.text);
    }
  });
  out$.iconInput = iconInput = createClass({
    displayName: 'icon-input',
    render: function(){
      var divProps;
      divProps = getAttr(this.props, ['href', 'onClick', 'className']);
      divProps = mergeProp(divProps, {
        className: "ui input icon"
      });
      return _('div', divProps, _('i', {
        className: "icon " + this.props.icon
      }), _('input', this.props.input));
    }
  });
  out$.ui = ui = createClass({
    displayName: 'ui',
    render: function(){
      var props;
      props = addClassName(this.props, 'ui');
      return _('div', props, this.props.children);
    }
  });
  out$.field = field = createClass({
    displayName: 'field',
    render: function(){
      var props;
      props = addClassName(this.props, 'field');
      return _('div', props, this.props.children);
    }
  });
  out$.tabMenu = tabMenu = createClass({
    displayName: 'tab-menu',
    componentDidMount: function(){
      return $('.filter.menu .item').tab();
    },
    render: function(){
      var menuProps, menu, tab, tabProp, tabs, res$, i$, ref$, len$, prop;
      menuProps = addClassName(this.props.menuProps, "filter menu");
      menu = _('div', {
        className: "tab",
        key: 'menu'
      }, _(ui, menuProps, (function(){
        var i$, ref$, len$, results$ = [];
        for (i$ = 0, len$ = (ref$ = this.props.tabs).length; i$ < len$; ++i$) {
          tab = ref$[i$];
          tabProp = addClassName(tab.prop, "item");
          tabProp = mergeProp(tabProp, {
            "data-tab": tab.tabName
          });
          if (tab.tabName === this.props.active) {
            tabProp = addClassName(tabProp, "active");
          }
          tabProp.key = tab.tabName;
          results$.push(_('a', tabProp, tab.text));
        }
        return results$;
      }.call(this))));
      res$ = [];
      for (i$ = 0, len$ = (ref$ = this.props.tabs).length; i$ < len$; ++i$) {
        tab = ref$[i$];
        prop = {
          className: "tab",
          "data-tab": tab.tabName
        };
        if (tab.tabName === this.props.active) {
          prop = addClassName(prop, "active");
        }
        prop.key = tab.tabName;
        res$.push(_(ui, prop, tab.dom));
      }
      tabs = res$;
      return _(ui, {}, [menu].concat(tabs));
    }
  });
  out$.labelField = labelField = createClass({
    displayName: 'label-field',
    render: function(){
      var text, ref$, ref1$;
      text = (ref1$ = (ref$ = this.props).text, delete ref$.text, ref1$);
      return _(field, this.props, [_('label', {
        key: 'label'
      }, text)].concat(this.props.children));
    }
  });
  out$.dropdown = dropdown = createClass({
    displayName: 'dropdown',
    componentDidMount: function(){
      return $(".dropdown.ui").dropdown();
    },
    render: function(){
      var uiProps, key, val;
      uiProps = addClassName(this.props, "dropdown");
      return _(ui, uiProps, _('input', {
        type: 'hidden',
        name: this.props.name
      }), _('div', {
        className: "default text"
      }, this.props['default']), _('i', {
        className: "dropdown icon"
      }), _('div', {
        className: "menu"
      }, (function(){
        var ref$, results$ = [];
        for (key in ref$ = this.props.options) {
          val = ref$[key];
          results$.push(_('div', {
            className: "item",
            "data-value": key,
            key: key
          }, val));
        }
        return results$;
      }.call(this))));
    }
  });
  out$.codeLink = codeLink = createClass({
    displayName: 'code',
    render: function(){
      var className;
      className = classnames(this.props.className, 'green');
      return _(iconText, {
        className: className,
        icon: 'code',
        text: this.props.text || this.props.sid + "",
        href: "#/solution/" + this.props.sid
      });
    }
  });
  out$.probLink = probLink = createClass({
    displayName: 'problem',
    render: function(){
      var className;
      className = classnames(this.props.className, 'brown');
      if (this.props.prob._id > 0) {
        return _(iconText, {
          className: className,
          icon: 'puzzle',
          text: this.props.prob._id + ". " + this.props.prob.outlook.title,
          href: "#/problem/" + this.props.prob._id
        });
      } else {
        return _(iconText, {
          className: className,
          icon: 'puzzle',
          text: 'hidden'
        });
      }
    }
  });
  out$.rndLink = rndLink = createClass({
    displayName: 'round',
    render: function(){
      var className, text;
      className = classnames(this.props.className, 'teal');
      if (this.props.noTitle === true) {
        text = this.props.rnd._id + "";
      } else {
        text = this.props.rnd._id + ". " + this.props.rnd.title;
      }
      return _(iconText, {
        className: className,
        icon: 'idea',
        text: text,
        href: "#/round/" + this.props.rnd._id
      });
    }
  });
  out$.userLink = userLink = createClass({
    displayName: 'user',
    render: function(){
      var className;
      className = classnames(this.props.className, '');
      return _(iconText, {
        className: className,
        icon: 'user',
        text: this.props.user + "",
        href: "#/user/" + this.props.user
      });
    }
  });
  out$.roundTime = roundTime = createClass({
    displayName: 'round-time',
    render: function(){
      var style;
      style = moment().isBefore(this.props.begTime)
        ? 'green'
        : moment().isAfter(this.props.endTime) ? 'grey' : 'red';
      return _('div', null, " from ", _('div', {
        className: "ui label " + style
      }, moment(this.props.begTime).format('YYYY-MM-DD hh:mm:ss')), " to ", _('div', {
        className: "ui label " + style
      }, moment(this.props.endTime).format('YYYY-MM-DD hh:mm:ss')));
    }
  });
}).call(this);
