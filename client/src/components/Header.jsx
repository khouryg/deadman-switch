import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

function Header() {
  function changeTheme() {
    const html = document.documentElement;
    const modeSwitch = document.getElementById("mode-switch");
    const currentTheme = html.getAttribute("data-theme");
    const targetTheme = currentTheme === "dark" ? "light" : "dark";
    html.setAttribute("data-theme", targetTheme);
    if (targetTheme === "dark") {
        modeSwitch.innerText = "Light Mode";
    } else {
        modeSwitch.innerText = "Dark Mode";
    }
  }
  useEffect(() => {
    const html = document.documentElement;
    const modeSwitch = document.getElementById("mode-switch");
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      html.setAttribute("data-theme", "dark");
      modeSwitch.innerText = "Light Mode";
    } else {
      html.setAttribute("data-theme", "light");
      modeSwitch.innerText = "Dark Mode";
    }
  }, []);
  return (
    <div className="container">
      <nav>
        <ul>
          <li><strong>Deadman Talkin</strong></li>
        </ul>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/access">Access</Link></li>
          <li><a href="#" role="button" id="mode-switch" onClick={changeTheme}></a></li>
        </ul>
      </nav>
    </div>
  );
}

export default Header;
