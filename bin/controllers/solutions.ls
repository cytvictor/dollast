require! {
  \../db
  \debug
}

log = debug \dollast:ctrl:sol

export submit = ->*
  @acquire-privilege \login
  @check-body \pid .is-int! .ge 1
  @check-body \lang .in [\cpp, \java]
  @check-body \code .len 1, 50000
  return if @errors

  log state: @state.user
  uid = @state.user.client.uid
  yield db.solutions.submit @request.body, uid
  @body = status:
    type: "ok"
    msg: "solution submited successfully"

export list = ->*
  @body = yield db.solutions.list @query

export show = ->*
  @acquire-privilege \login
  @body = yield db.solutions.show @params.sid

export toggle = ->*
  @acquire-privilege \login
  @body = yield db.solutions.toggle @params.sid
  @body <<< status:
    type: "ok"
    msg: "solution toggled"