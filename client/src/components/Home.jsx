import React, {useState} from 'react';
import Modal from './Modal.jsx';

function Form() {
  const [confirmModal, setConfirmModal] = useState(false);
  const [formData, setFormData] = useState({timer: "1"});
  function handleFormChange(e) {
    setFormData({...formData, [e.target.name]: e.target.value});
  }
  function handleSubmit(e) {
    e.preventDefault();
    setConfirmModal(!confirmModal);
  }
  return (
  <div class='container'>
    <form>
      <h4>Create a deadman switch</h4>
      <label>Switch length</label>
      <span>Minutes: {formData.timer}</span>
      <input type="range" name="timer" min="0" max="10" step="1" value={formData.timer} class="range-input" onChange={handleFormChange}/>
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

export default Form;