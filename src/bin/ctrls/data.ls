require! {
  "../db"
  "../core"
  "co-busboy"
  \debug
}

log = debug \dollast:ctrl:data

export
  upload: ->*
    @acquire-privilege \login
    pid = @params.pid
    parts = co-busboy @, auto-fields: true
    while part = yield parts
      log {part}
      @body = yield core.upload pid, part
    yield db.prob.upd-data pid
    @body <<< status:
      type: "ok"
      msg: "upload successful"

  delete: ->* # validate
    @acquire-privilege \login
    pid = @params.pid
    yield core.delete-test-data pid, @params.file
    @body = status:
      type: "ok"
      msg: "data has been deleted"

  show: ->*
    @acquire-privilege \login
    data = yield db.prob.list-dataset @params.pid
    @body = data
