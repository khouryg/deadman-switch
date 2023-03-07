import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from './Header.jsx';
import Create from './Create.jsx';
import Message from './Message.jsx';
import Access from './Access.jsx';
import Summary from './Summary.jsx';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route exact path="/" element={<Create/>} />
        <Route path="/message/:id?" element={<Message/>}/>
        <Route path="/access/:id?" element={<Access/>}/>
        <Route path="/summary/:id" element={<Summary/>}/>
      </Routes>
    </Router>
  );
}

export default App;