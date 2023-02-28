import React, {useState} from 'react';
import Modal from './Modal';
var CryptoJS = require("crypto-js");


function Form({formData, setFormData}) {
  const [confirmModal, setConfirmModal] = useState(false);

  function handleFormChange(e) {
    setFormData({...formData, [e.target.name]: e.target.value});
  }
  function handleSubmit(e) {
    e.preventDefault();
    setConfirmModal(!confirmModal);
  }
  function encryptMessage(e) {
    const plaintext = e.target.value;
    const passphrase = formData.passphrase;
    const salt = CryptoJS.lib.WordArray.random(128/8);  // Generate a random salt value
    const key = CryptoJS.PBKDF2(passphrase, salt, { keySize: 256/32, iterations: 10000 });
    const encrypted = CryptoJS.AES.encrypt(plaintext, key, { keySize: 256/32 });
    setFormData({...formData, encrypted_message: encrypted, "salt": salt})
  }
  return (
  <div class='container'>
    <form>
      <h4>Create a deadman switch</h4>

      <label>Switch length</label>
      <span>Minutes: {formData.timer}</span>
      <input type="range" name="timer" min="0" max="10" step="1" value={formData.timer} class="range-input" onChange={handleFormChange}/>
      <label>Recepient's Email</label>
      <input type="email" name="recipient-email" placeholder="e.g. satoshi@gmail.com"  onChange={handleFormChange}></input>
      <label>Email for switch reminder</label>
      <input type="text" name="reminder-email" placeholder="optional" onChange={handleFormChange}></input>
      <label>Passphrase:</label>
      <input type="password" name="passphrase" onChange={handleFormChange}></input>
      <label>Message:</label>
      <textarea type="text" name="plaintext" onChange={handleFormChange}></textarea>
      <button onClick={handleSubmit}>{confirmModal && <Modal />}Submit</button>
    </form>
  </div>
  );
}

export default Form;