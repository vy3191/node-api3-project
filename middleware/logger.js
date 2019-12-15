
function logger(req,res, next) {
   console.log(`Http method: ${req.method} - Request URL:${req.url}`);
   next();
}

module.exports = {
  logger
}