import React, {useState} from 'react';
import Header from './Header.jsx'
import Form from './Form.jsx';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// const axios = require('axios');

function App() {
  const [formData, setFormData] = useState({timer: "1"});

  return (

  <div class="container-fluid">
    <Header />
    <Form formData={formData} setFormData={setFormData}/>
  </div>);
}

export default App;