const jwt = require('jsonwebtoken');
module.exports = async (req, res, proceed) => {
  const token = req.cookies.token;
  if (!token) {
    return res.redirect('/login?redirect=' + req.url);
  }
  try {
    const decoded = jwt.verify(token, 'DellvelopersSecret');
    req.userId = decoded.user;
    return proceed();
  } catch (err) {
    res.status(404);
    return res.view('404');
  }
};
