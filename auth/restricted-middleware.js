const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets.js');

module.exports = (req, res, next) => { 
   const token = req.headers.authorization; 
  
   if (token) {
    jwt.verify(token, secrets.jwtSecret, (error, decodedToken) => {
      if (error) {
        res.status(401)
        .json({message: 'we do not like your token' })
      } else {
        req.decodedJwt = decodedToken 
        console.log('decoded token', req.decodedJwt);
        next();
      }
    }) 
   } else {
     res.status(500)
     .json({message: 'No shoes. No token. No service.'})
   }
  };