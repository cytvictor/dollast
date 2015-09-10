// Generated by LiveScript 1.4.0
(function(){
  var filters;
  filters = angular.module("dollast-filters", ["ngSanitize"]);
  filters.filter('probRef', function(){
    return function(prob){
      var ref$;
      if (prob != null && ((ref$ = prob.outlook) != null && ref$.title)) {
        return "<a href='#/problem/" + prob._id + "'>" + prob._id + ". " + prob.outlook.title + "</a>";
      } else {
        return "hidden problem";
      }
    };
  });
  filters.filter('rndRef', function(){
    return function(rnd){
      if ("number" === typeof rnd) {
        return rnd;
      } else if ("object" === typeof rnd) {
        return rnd._id + ". " + rnd.title;
      }
    };
  });
}).call(this);
