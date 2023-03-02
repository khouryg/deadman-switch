import React from 'react';
import { Link } from 'react-router-dom';
function Header() {
  return (
  <div>
    <nav>
      <ul>
        <li><strong>Deadman Talkin</strong></li>
      </ul>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/access">Access</Link></li>
        <li><a href="#" role="button">Button</a></li>
      </ul>
    </nav>
  </div> );
}

export default Header;