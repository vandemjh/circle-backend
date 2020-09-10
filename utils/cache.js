module.exports = (duration) => {
  var mcache = require('memory-cache');
  return (req, res, next) => {
    let key = '__express__' + req.originalUrl || req.url;
    let cached = mcache.get(key);
    if (cached) {
      // console.log('Using cached version!');
      res.send(cached);
      return;
    } else {
      // console.log('Saving cache for next time!');
      res.sendResponse = res.send;
      res.send = (body) => {
        mcache.put(key, body, duration * 1000 * 60 * 60);
        res.sendResponse(body);
      };
      next();
    }
  };
};
