const mongoose = require('mongoose');

const defSchema = new mongoose.Schema({
  timer: {type: String, required: true},
  recipient_email: {type: String, required: true},
  reminder_email: String,
  passphrase: {type: String, required: true},
  plaintext: {type: String, required: true},
})

const Message = mongoose.model('Message', defSchema);

module.exports = {
  addMessage(data) {
    return Message.insertMany(data)
      .then(() => console.log('added to db'))
      .catch((err) => console.log(err))
  }
};