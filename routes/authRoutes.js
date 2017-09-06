const passport = require('passport');

module.exports = app => {
  app.get('/oauth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
  }));

  app.get('/oauth/google/callback',
    passport.authenticate('google'),
    (req, res) => {
     res.redirect('/');
    }
  );

  app.get('/api/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

  app.get('/api/current_user', (req, res) => {
    res.json(req.user);
  });
};