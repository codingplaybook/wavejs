const jwt = require('jsonwebtoken');

function verify(req,res,next){
  const token = req.header('auth-token');
  if(!token) return res.status(401).send('Access Denied');

  try {
    const verified = jwt.verify(token, 'XtDEPPmawj5ynvxhSfTnHfSxxi8SIFdxYG3yoVJn');
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send('Invalid Token');
  }

  /*jwt.verify(token, process.env.TOKEN_SECRET)
  .then(verified => { return req.user = verified})
  .catch(err=> res.status(400).send('Invalid Token'))
  */
}

module.exports = verify;