import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { enc } from 'crypto-js';
var CryptoJS = require("crypto-js");

function Message() {
  const [reveal, setReveal] = useState(false);
  const [decryptedMessage, setDecryptedMessage] = useState('');
  let encrypted;
  const { id } = useParams();
  useEffect(() => {
    axios.get(`/getmessage/${id}`)
      .then((response) => {
        encrypted = response.data;
        console.log(encrypted);
      })
      .catch(err => console.log(err))
  }, []);
  function handleDecrypt() {
    const ciphertext = encrypted.message;
    const passphrase = document.getElementById("decrypt-message").value;
    const salt = CryptoJS.enc.Hex.parse(encrypted.salt);
    const key = CryptoJS.PBKDF2(passphrase, salt, { keySize: 256/32, iterations: 10000 });
    const decrypted = CryptoJS.AES.decrypt(ciphertext, key, { iv: salt, keySize: 256/32 });
    setDecryptedMessage(decrypted.toString(CryptoJS.enc.Utf8));
    console.log("decrypted message", decryptedMessage)
    setReveal(!reveal);
  }

  return (
    <div class="container">
      <h4>Decrypt</h4>
      <div hidden={reveal}>
        <div class="zomg-spacer"></div>
        <div>Decrypt message id: <strong>{id}</strong></div>
        <label>Enter Passphrase:</label>
        <input id="decrypt-message" type="password"  ></input>
        <button onClick={handleDecrypt}>Decrypt</button>
      </div>
      <div hidden={!reveal}>
        <div>Decrypt message id: <strong>{id}</strong></div>
        <label>Message:</label>
        <p>{decryptedMessage}</p>
      </div>

    </div>
  );
}

export default Message;