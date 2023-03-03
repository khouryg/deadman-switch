import React, {useState, useEffect} from 'react';
var CryptoJS = require("crypto-js");
const axios = require("axios");

function Modal({setFormData, formData, confirmModal, setConfirmModal}) {
  const [encryptedData, setEncryptedData] = useState({});
  const [submitMessage, setSubmitMessage] = useState(false);
  useEffect(() => {
    const plaintext = formData.message;
    const passphrase = formData.passphrase;
    const salt = CryptoJS.lib.WordArray.random(128/8);
    const key = CryptoJS.PBKDF2(passphrase, salt, { keySize: 256/32, iterations: 10000 });
    const encrypted = CryptoJS.AES.encrypt(plaintext, key, { iv: salt, keySize: 256/32 });
    const formDataCopy = {...formData};
    delete formDataCopy.passphrase;
    setEncryptedData({...formDataCopy, message: encrypted.toString(), salt: salt.toString()});
  }, []);
  useEffect(() => {
    if(encryptedData.salt) {
      let id;
      console.log("form data", encryptedData);
      axios.post('/addmessage', encryptedData)
        .then(response => {id = response.data})
        .then(() => {window.location.href = `/summary/${id}`})
        .catch(err => console.log(err))
    }
  }, [submitMessage]);
  async function submitMessages() {
    console.log('done encrypting');
    // window.location.href = `http://127.0.0.1:3001/message/`;
  }
  return (
    <dialog open>
      <article>
        <h3>You are about to broadcast a switch with the following information:</h3>
        <div id="switch-review">
          <p><strong>Recipient:</strong> {formData.recipient_email}</p>
          <p><strong>Reminder Email:</strong> {formData.reminder_email}</p>
          <p><strong>Passphrase:</strong> {formData.passphrase}</p>
          <p><strong>Message:</strong> {formData.message}</p>
        </div>
        <footer>
          <a href="#cancel" role="button" class="secondary" onClick={() => {setConfirmModal(false)}}>Cancel</a>
          <a href="#confirm" role="button" onClick={() => setSubmitMessage(!submitMessage)}>Confirm</a>
        </footer>
      </article>
    </dialog>
  );
}

export default Modal;