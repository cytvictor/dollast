require! {
  \mongoose
  \debug
  \bcrypt
  \prelude-ls : {difference}
  \./conn
  \../db
}

log = debug "dollast:user"

schema = new mongoose.Schema do
  _id: String
  pswd: String
  desc: String
  register: Date
  groups: [String]

schema.methods.check-password = (candidate) ->
  return bcrypt.compare-sync candidate, @pswd

model = conn.conn.model 'user', schema

export query = (uid, pswd) ->*
  usr = yield model.find-by-id uid .exec!
  if not usr or not usr.check-password pswd
    return null
  return usr

export show = (uid) ->*
  log "uid: #uid", @get-current-user!
  if uid != @get-current-user!._id
    @acquire-privilege 'user-all'
  return yield model.find-by-id uid, "-pswd" .exec!

export modify = (user) ->*
  if user._id != @get-current-user!._id
    @acquire-privilege 'user-all'
  doc = yield model.find-by-id user._id .exec!
  if not doc
    @throw "no such user exists"
  priv-diff = difference doc?.groups, user?.groups
  log doc?.groups, user?.groups
  if priv-diff? and priv-diff.length > 0
    @acquire-privilege 'user-all'
  doc <<< user
  yield doc.save!

export register = (user) ->*
  log {user}
  exists = yield model.find-by-id user._id, '_id' .lean! .exec!
  if exists
    log "here", old
    return
      type: \register
      error: true
      payload: "duplicate user id"

  user.groups = []
  user = new model user

  salt = bcrypt.gen-salt-sync bcrypt.bcrypt-cost
  user.pswd = bcrypt.hash-sync user.pswd, salt
  yield user.save!

  return
    type: \register
    payload: "register successful"

export profile = (uid) ->*
  profile = yield model.find-by-id uid, '-pswd' .lean! .exec!
  solved-problems = yield db.sol.get-user-solved-problems uid
  owned-problems = yield db.prob.get-user-owned-problems uid
  owned-rounds = yield db.rnd.get-user-owned-rounds uid
  return {profile, solved-problems, owned-problems, owned-rounds}

export get-privileges = (uid) ->*
  user = yield model.find-by-id uid, \groups .lean! .exec!
  return user

# CSRF
