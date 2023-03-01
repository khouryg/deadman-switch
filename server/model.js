const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const cron = require('node-cron');
require('dotenv').config();

const defSchema = new mongoose.Schema({
  timer: {type: Number, required: true},
  recipient_email: {type: String, required: true},
  reminder_email: String,
  passphrase: {type: String, required: true},
  plaintext: {type: String, required: true},
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
        text: 'This is a test email from Nodemailer'
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
      .then(() => console.log('added to db'))
      .catch((err) => console.log(err))
  }
};

