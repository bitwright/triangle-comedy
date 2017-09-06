module.exports = app => {
  app.post('/venues', (req, res) => {
    console.log(req.body); 
  });
};