import React, {useState, useEffect} from 'react';
var CryptoJS = require("crypto-js");
const axios = require("axios");

function Modal({setFormData, formData}) {
  const [submitted, setSubmitted] = useState(false);
  useEffect(() => {

  }, []);
  async function encryptMessage() {
    const plaintext = formData.message;
    const passphrase = formData.passphrase;
    const salt = CryptoJS.lib.WordArray.random(128/8);
    const key = CryptoJS.PBKDF2(passphrase, salt, { keySize: 256/32, iterations: 10000 });
    const encrypted = CryptoJS.AES.encrypt(plaintext, key, { iv: salt, keySize: 256/32 });
    setFormData({...formData, message: encrypted.toString(), salt: salt.toString()});
    setSwitch(true);
    console.log('done encrypting');
    // window.location.href = `http://127.0.0.1:3001/message/`;
    console.log("form data", formData);
    axios.post('/message', formData)
      .then(response => console.log(response))
      .catch(err => console.log(err))
  }
  return (
    <dialog open>
      <article>
        <h3>You are about to broadcast a switch with the following information:</h3>
        <div id="switch-review">
          <p><strong>Recipient:</strong> {formData['recipient-email']}</p>
          <p><strong>Reminder Email:</strong> {formData['reminder-email']}</p>
          <p><strong>Passphrase:</strong> {formData.passphrase}</p>
          <p><strong>Message:</strong> {formData.message}</p>
        </div>
        <footer>
          <a href="#cancel" role="button" class="secondary">Cancel</a>
          <a href="confirm" role="button" onClick={encryptMessage}>Confirm</a>
        </footer>
      </article>
    </dialog>
  );
}

export default Modal;