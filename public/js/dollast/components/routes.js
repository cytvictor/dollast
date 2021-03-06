// Generated by LiveScript 1.4.0
(function(){
  var R, ref$, T, D;
  R = require('react');
  ref$ = require('react-router'), T = ref$.Route, D = ref$.IndexRoute;
  module.exports = function(app){
    return _(T, {
      path: '/',
      component: app
    }, _(D, {
      component: require('./site/index')
    }), _(T, {
      path: 'about',
      component: require('./site/about')
    }), _(T, {
      path: 'login',
      component: require('./site/login')
    }), _(T, {
      path: 'problem'
    }, _(D, {
      component: require('./problem/list')
    }), _(T, {
      path: 'create',
      component: require('./problem/modify')
    }), _(T, {
      path: ":pid"
    }, _(D, {
      component: require('./problem/show')
    }), _(T, {
      path: 'modify',
      component: require('./problem/modify')
    }), _(T, {
      path: 'stat',
      component: require('./problem/stat')
    }))), _(T, {
      path: 'solution'
    }, _(D, {
      component: require('./solution/list')
    }), _(T, {
      path: "submit/:pid",
      component: require('./solution/submit')
    }), _(T, {
      path: "user/:uid",
      component: require('./solution/list')
    }), _(T, {
      path: ":sid",
      component: require('./solution/show')
    })), _(T, {
      path: 'round'
    }, _(D, {
      component: require('./round/list')
    }), _(T, {
      path: 'create',
      component: require('./round/modify')
    }), _(T, {
      path: ":rid"
    }, _(D, {
      component: require('./round/show')
    }), _(T, {
      path: 'modify',
      component: require('./round/modify')
    }), _(T, {
      path: 'board',
      component: require('./round/board')
    }))), _(T, {
      path: 'user'
    }, _(D, {
      component: require('./user/profile')
    }), _(T, {
      path: 'register',
      component: require('./user/register')
    }), _(T, {
      path: ":uid"
    }, _(D, {
      component: require('./user/profile')
    }), _(T, {
      path: 'modify',
      component: require('./user/modify')
    }))));
  };
}).call(this);
