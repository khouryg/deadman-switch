const model = require('./model');

module.exports = {
  addMessage(req, res) {
    model.addMessage(req.body)
      .then((response) => {
        const id = response[0]._id.toString();
        res.status(200).send(id)})
      .catch((err) => {console.log(err); res.status(400).send('error adding to db')});
  },
  getMessage(req, res) {
    model.getMessage(req.params.id)
      .then((response) => {
        res.status(200).json(response);
      })
      .catch((err) => {res.status(400).send(err)})
  }
}