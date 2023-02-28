import React from 'react';

function Modal() {
  return (
    <dialog open>
      <article>
        <h3>Confirm your action!</h3>
        <p>
          Mauris non nibh vel nisi sollicitudin malesuada.
          Donec ut sagittis erat. Praesent eu eros felis.
          Ut consectetur placerat pulvinar.
        </p>
        <footer>
          <a href="#cancel" role="button" class="secondary">Cancel</a>
          <a href="#confirm" role="button">Confirm</a>
        </footer>
      </article>
    </dialog>
  );
}

export default Modal;