import React, {useState} from 'react';
import Modal from './Modal.jsx';

function Create() {
  const [confirmModal, setConfirmModal] = useState(false);
  const [formData, setFormData] = useState({timer: "30", price: 1.00.toFixed(2)});
  function handleFormChange(e) {
    const time = parseInt(e.target.value);
    let price;
    if(e.target.name === 'timer') {
      if(time <= 30) {
        price = 1;
      } else {
        price = time * 5/120;
      }
      setFormData({...formData, [e.target.name]: e.target.value, "price": price.toFixed(2)});

    } else {
      setFormData({...formData, [e.target.name]: e.target.value});
    }
  }
  function handleSubmit(e) {
    e.preventDefault();
    setConfirmModal(!confirmModal);
  }
  function why() {
    return (
      <article>
      <h3>Why create a switch?</h3>
        <p>Deadman talkin allows you send a final message to a loved one in the event that you stop responding.</p>
      </article>
    )
  }
  return (
  <div class='container'>
    {why()}
    <form>
      <h4 id="create-top">Create a deadman switch</h4>
      <div class="zomg-spacer"></div>
      <span>Switch length: <strong>{formData.timer}</strong> seconds</span>
      <div id="price">Price: $<strong>{formData.price}</strong></div>
      <input type="range" name="timer" min="10" max="120" step="10" value={formData.timer} class="range-input" onChange={handleFormChange}/>
      <label>Recepient's Email</label>
      <input type="email" name="recipient_email" placeholder="e.g. satoshi@gmail.com"  onChange={handleFormChange}></input>
      <label>Email for switch reminder</label>
      <input type="text" name="reminder_email" placeholder="optional" onChange={handleFormChange}></input>
      <label>Passphrase:</label>
      <input type="password" name="passphrase" onChange={handleFormChange}></input>
      <label>Message:</label>
      <textarea id="plaintext-message" type="text" name="message" onChange={handleFormChange}></textarea>
      {/* need to add validation here to prevent error from empty submition */}
      <button onClick={handleSubmit}>Submit</button>
      {confirmModal && <Modal formData={formData} setFormData={setFormData} confirmModal={confirmModal} setConfirmModal={setConfirmModal}/>}
    </form>
  </div>
  );
}

export default Create;