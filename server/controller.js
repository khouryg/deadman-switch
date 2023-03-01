const model = require('./model');

module.exports = {
  addMessage(req, res) {
    console.log(req.body);
    model.addMessage(req.body)
      .then(() => {res.status(200).send('added to db')})
      .catch((err) => {console.log(err); res.status(400).send('error adding to db')});
  },
}