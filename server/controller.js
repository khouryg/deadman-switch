const model = require('./model');

module.exports = {
  addMessage(req, res) {
    console.log(req);
    model.addMessage(req.body)
      .then((response) => {
        const id = response[0]._id.toString();
        res.status(200).send(id)})
      .catch((err) => {console.log(err); res.status(400).send('error adding to db')});
  },
}