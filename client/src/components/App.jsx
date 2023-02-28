import React, {useState} from 'react';
import Header from './Header.jsx'
import Form from './Form.jsx';

function App() {
  const [formData, setFormData] = useState({timer: "1"});
  return (
  <div class="container-fluid">
    <Header />
    <Form formData={formData} setFormData={setFormData}/>
  </div>);
}

export default App;