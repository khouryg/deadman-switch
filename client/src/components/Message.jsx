import React, {useState} from 'react';
import { useParams } from 'react-router-dom';

function Message() {
  const { id } = useParams();

  return (
    <div class="container">
      <div>Decrypt message id: <strong>{id}</strong></div>
      <label>Enter Passphrase:</label>
      <input type="text" ></input>
      <button>Decrypt</button>
    </div>
  );
}

export default Message;