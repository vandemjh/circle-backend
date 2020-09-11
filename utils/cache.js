var mcache = require('memory-cache');

module.exports = (duration) => {
  return async (req, res, next) => {
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
        // Duration is in days
        mcache.put(key, body, duration * 1000 * 60 * 60 * 24);
        res.sendResponse(body);
      };
      next();
    }
  };
};
