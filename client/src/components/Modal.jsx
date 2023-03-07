import React, {useState, useEffect} from 'react';
var CryptoJS = require("crypto-js");
const axios = require("axios");
import { BTC_PAY_KEY } from '../../../config';


function Modal({setFormData, formData, confirmModal, setConfirmModal}) {
  const [encryptedData, setEncryptedData] = useState({});
  const [submitMessage, setSubmitMessage] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState(null);
  // encrypt message
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
  // add time to data before submitting
  // useEffect(() => {
  //   if(encryptedData.salt) {
  //     let id;
  //     const trigger = (parseInt(encryptedData.timer) * 1000) + Date.now();
  //     const data = {...encryptedData, trigger: trigger}
  //     axios.post('/addmessage', data)
  //       .then(response => {id = response.data})
  //       .then(() => {window.open(response.data.paymentUrl); window.location.href = `/summary/${id}`})
  //       // .then(() => {window.location.href = `/summary/${id}`})
  //       .catch(err => console.log(err))
  //   }
  // }, [submitMessage]);
  const generateInvoice = async () => {
    const response = await axios.post('https://bitcoinbored.com/api/v1/stores/6qmjCKRCrMRq8fBtdEBdKEwR9oBUgPuhD1U4iuanfxR4/invoices', {
      amount: encryptedData.price,
      currency: 'USD'
    }, {
      headers: {
        Authorization: `token ${BTC_PAY_KEY}`
      }
    });

    // Open the payment page in a new window
    window.open(response.data.checkoutLink)
    console.log('resonse', response);
    // Poll the payment status until it has been paid
    const pollPaymentStatus = setInterval(async () => {
      const paymentResponse = await axios.get(`https://bitcoinbored.com/api/v1/stores/6qmjCKRCrMRq8fBtdEBdKEwR9oBUgPuhD1U4iuanfxR4/invoices/${response.data.id}`, {
        headers: {
          Authorization: `token ${BTC_PAY_KEY}`
        }
      });

      if (paymentResponse.data.status === 'Settled') {
        // Stop polling and execute the callback function
        clearInterval(pollPaymentStatus);
        onPaymentComplete();
      }
    }, 5000); // Poll every 5 seconds
  };
  function onPaymentComplete() {
    if(encryptedData.salt) {
      let id;
      const trigger = (parseInt(encryptedData.timer) * 1000) + Date.now();
      const data = {...encryptedData, trigger: trigger}
      axios.post('/addmessage', data)
        .then(response => {id = response.data})
        .then(() => {window.location.href = `/summary/${id}`})
        // .then(() => {window.location.href = `/summary/${id}`})
        .catch(err => console.log(err))
    }
  }
  // const generateInvoice = () => {
  //   if (encryptedData && encryptedData.price) {
  //     const amount = parseFloat(encryptedData.price);
  //     axios.post('https://bitcoinbored.com/api/v1/stores/6qmjCKRCrMRq8fBtdEBdKEwR9oBUgPuhD1U4iuanfxR4/invoices', {
  //       amount: amount,
  //       currency: 'USD',
  //       checkout: {
  //         redirectURL: `http://127.0.0.1:3001/summary/`,
  //         redirectAutomatically: true,
  //       }
  //     }, {
  //       headers: {
  //         Authorization: `token ${BTC_PAY_KEY}`
  //       }
  //     })
  //       .then(response => {
  //         console.log(response)
  //         // setPaymentUrl(response.data.checkoutLink);
  //         window.open(response.data.checkoutLink);
  //       })
  //       .catch(err => console.log(err))
  //   }
  // };
  async function submitMessages() {
    console.log('done encrypting');
    // window.location.href = `http://127.0.0.1:3001/message/`;
  }
  return (
    <dialog open>
      <article>
        <h3>You are about to broadcast a switch with the following information:</h3>
        <div id="switch-review">
        {/* // this needs to be changed to be dynamic */}
          <p><strong>Duration:</strong> {formData.timer} seconds</p>
          <p><strong>Cost:</strong> {formData.price} seconds</p>
          <p><strong>Recipient:</strong> {formData.recipient_email}</p>
          <p><strong>Reminder Email:</strong> {formData.reminder_email}</p>
          <p><strong>Passphrase:</strong> {formData.passphrase}</p>
          <p><strong>Message:</strong> {formData.message}</p>
          <p><strong>Salt:</strong> {encryptedData.salt}</p>
          <p><strong>Encrypted Message:</strong> {encryptedData.message}</p>
        </div>
        <footer>
          <a href="#cancel" role="button" class="secondary" onClick={() => {setConfirmModal(false)}}>Cancel</a>
          <a href="#confirm" role="button" onClick={generateInvoice}>Confirm</a>
        </footer>
      </article>
    </dialog>
  );
}

export default Modal;