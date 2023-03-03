const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const cron = require('node-cron');
require('dotenv').config();

const defSchema = new mongoose.Schema({
  timer: {type: Number, required: true},
  recipient_email: {type: String, required: true},
  reminder_email: String,
  salt: {type: String, required: true},
  message: {type: String, required: true},
  delivered: {type: Boolean, default: false}
})

const Message = mongoose.model('Message', defSchema);

cron.schedule('*/30 * * * * *', async () => {
  const currentUnixTime = Date.now(); // get current Unix timestamp in seconds
  await Message.find({ timer: { $lt: currentUnixTime }, delivered: false})
  .then(async (docs) => {
    for(const message of docs) {
      const mailOptions = {
        from: 'Deadman-Switch-App <khoury90@gmail.com>',
        to: message.recipient_email,
        subject: `You've received an encrypted message`,
        text: `You will be able to decrypt your message with your passphrase here: http://localhost:3001/message/${message._id.toString()}`
      };

      transporter.sendMail(mailOptions, async (error, info) => {
        if (error) {
            console.error(error);
        } else {
            console.log('Email sent: ' + info.response);
            await Message.updateOne({ _id: message._id }, { delivered: true });
        }
      });
      // update the message afeter it has been sent
      // await Message.updateOne({ _id: message._id }, { delivered: true });
    }
  })
  .catch(err => {
    console.log(err);
  });
})

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
  }
});

module.exports = {
  addMessage(data) {
    return Message.insertMany(data)
      .then((response) => response)
      .catch((err) => console.log(err))
  },
  getMessage(id) {
    return Message.findById(id)
      .then((response) => response)
      .catch((err) => console.log(err) )
  }
};

