module.exports = (app) => {
  app.use((err, req, res, next) => {
    // err.name === 'UnauthorizedError' // Add custom error messages here
    if (err.name === 'UnauthorizedError') {
      res.status(err.status).send('Unauthorized');
      return;
    }
  });
};
