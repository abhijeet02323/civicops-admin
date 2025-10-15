module.exports = function ensureAuth(req, res, next) {
  if (req.session && req.session.token) return next()
  return res.redirect('/department/login')
}
