require! {
  "../db"
  "debug"
}

log = debug 'dollast:ctrls:prob'

export list = ->*
  @body = yield db.prob.list @query
  log "prob-list #{@body}"

export next-count = ->*
  @body =
    type: \success
    payload:
      _id: yield db.prob.next-count!

export show = ->*
  @body = yield db.prob.show @params.pid, mode: "view"

export total = ->*
  @body = yield db.prob.show @params.pid, mode: "total"

export brief = ->*
  @body = yield db.prob.show @params.pid, mode: "brief"

export save = ->*
  req = @request.body
  #@check-body 'method' .in ['modify', 'create'], 'wrong method'
  @check-body 'outlook' .not-empty 'must exists'
  @check-body 'config' .not-empty 'must exists'
  log req.outlook.title
  @check req.outlook, 'title' .len 1, 63
  #@check req.outlook, 'inFmt' .not-empty!
  #@check req.outlook, 'outFmt' .not-empty!
  #@check req.outlook, 'sampleIn' .not-empty!
  #@check req.outlook, 'sampleOut' .not-empty!
  @check req.config, 'timeLmt' .to-float! .gt 0
  @check req.config, 'spaceLmt' .to-float! .gt 0
  @check req.config, 'stkLmt' .to-float! .gt 0
  @check req.config, 'outLmt' .to-float! .gt 0
  @check req.config, 'judger' .in ['string', 'strict', 'real', 'custom']
  return if @errors

  @body = yield db.prob.modify @params.pid, @request.body
  @body <<< status:
    type: "ok"
    msg: "problem has been saved"

export remove = ->*
  ...

export repair = ->*
  new-pairs = yield db.prob.upd-data @params.pid
  @body =
    type: 'server/success'
    payload: new-pairs

export stat = ->*
  @body = yield db.prob.stat @params.pid
