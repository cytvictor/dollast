require! {
  "mongoose"
  "moment"
  "debug"
  "co"
  "prelude-ls": _
  \./conn
  \./permit : {schema: permit-schema, can-access}
  "../db"
}

log = debug "dollast:rnd-model"

schema = new mongoose.Schema do
  _id: Number
  permit: permit-schema
  title: String
  beg-time: Date
  end-time: Date
  published: Boolean
  probs: [type: Number, ref: \problem]
  # groups: [type: Number, ref: ]

schema.methods.is-started = ->
  moment!.is-after @beg-time

schema.methods.is-ended = ->
  moment!.is-after @end-time

lock-prob = co.wrap (rid, state, probs) ->*
  log "locking", probs
  yield for pid in probs
    db.prob.model.find-by-id-and-update pid, $set: "config.round": rid .exec!

unlock-prob = co.wrap (rid, state, probs) ->*
  log "unlocking", probs
  yield for pid in probs
    db.prob.model.find-by-id-and-update pid, $unset: "config.round": rid .exec!

model = conn.conn.model 'round', schema
count = 0
func-next-count = conn.make-next-count model, count

export next-count = ->*
  @acquire-privilege 'rnd-all'
  return yield func-next-count!

export modify = (rid, rnd) ~>*
  if rnd._id
    delete rnd._id
  if rid == 0
    rid = yield next-count.bind(@)!
    rnd._id = rid
    log {rid}
  else
    @ensure-access model, rid, \w

  rnd.beg-time = new Date that if rnd.beg-time
  rnd.end-time = new Date that if rnd.end-time
  doc = yield model.find-by-id rid .exec!
  if not doc
    doc = new model

  if rnd.probs
    old-probs = doc.probs || []
    new-probs = rnd.probs
    log old-probs, new-probs
    yield unlock-prob rid, false, _.difference old-probs, new-probs
    yield   lock-prob rid,  true, _.difference new-probs, old-probs

  doc <<< rnd
  log doc
  yield doc.save!
  return true

export show = (rid, opts = {}) ~>*
  opts.mode ||= "view"
  if opts.mode == "total"
    @ensure-access model, rid, \r

  rnd = yield model.find-by-id rid, '-__v' .populate 'probs', '_id outlook.title' .lean! .exec!
  if opts.mode == "view" and moment!.is-before rnd.beg-time
    rnd.probs = []
    rnd.started = false
  else
    rnd.started = true
  return rnd

export board = (rid, opts = {}) ->*
  @ensure-access model, rid, \r

  return yield db.sol.get-solutions-in-a-round rid

export list = ~>*
  return yield model.find {}, 'title begTime endTime' .lean! .exec!

export remove = (rid) ~>*
  @ensure-access model, rid, \w
  yield model.find-by-id-and-remove rid .lean! .exec!

export publish = (rid) ->*
  @ensure-access model, rid, \w

  doc = yield model.find-by-id rid .exec!
  if not doc
    throw new Error "no such round"
  if moment!.is-before doc.end-time
    throw new Error "round is running"
  yield unlock-prob rid, false, doc.probs
  doc.published = true
  yield doc.save!

  return status:
    type: "ok"
    msg: "published all problems"

export get-user-owned-rounds = (uid) ->*
  return yield model.find 'permit.owner': uid, '_id title begTime endTime' .exec!
