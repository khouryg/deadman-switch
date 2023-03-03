import React from 'react';
import { useParams } from 'react-router-dom';

function Summary() {
  const { id } = useParams();
  return (
    <div class='container'>
      <article>
        <p>Your switch has been set!</p>
        <p>Be sure to set a reminder to re-activate your switch.</p>
        <p>Switch ID: <strong>{id}</strong></p>
      </article>
    </div>
  );
}

export default Summary;