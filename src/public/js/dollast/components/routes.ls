R = require \react/addons
router = require \react-router
# history = require \react-router/lib/History
T = router.Route
D = router.DefaultRoute

module.exports = (app) ->
  _ T, handler: app,
    _ D, handler: require(\./site/index)
    _ T, path: \about, handler: require(\./site/about)
    _ T, path: \login, handler: require(\./site/login)
    _ T, path: \problem,
      _ D, handler: require(\./problem/list)
      _ T, path: \create, handler: require(\./problem/modify)
      _ T, path: ":pid",
        _ D, handler: require(\./problem/show)
        _ T, path: \modify, handler: require(\./problem/modify)
        _ T, path: \stat, handler: require(\./problem/stat)
    _ T, path: \solution,
      _ D, handler: require(\./solution/list)
      _ T, path: "submit/:pid", handler: require(\./solution/submit)
      _ T, path: "user/:uid", handler: require(\./solution/list)
      _ T, path: ":sid", handler: require(\./solution/show)
    _ T, path: \round,
      _ D, handler: require(\./round/list)
      _ T, path: \create, handler: require(\./round/modify)
      _ T, path: ":rid",
        _ D, handler: require(\./round/show)
        _ T, path: \modify, handler: require(\./round/modify)
        _ T, path: \board, handler: require(\./round/board)
    _ T, path: \user,
      _ D, handler: require(\./user/show)
      _ T, path: \register, handler: require(\./user/register)
      _ T, path: ":uid",
        _ D, handler: require(\./user/show)
        _ T, path: \modify, handler: require(\./user/modify)
