import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Router from './routes/Router';
import ToastNotificationContainer from './components/ToastContainer/ToastContainer';

function App() {
  return (
    <div className="App">
      <ToastNotificationContainer />
      <BrowserRouter>
        <Router/>
      </BrowserRouter>
    </div>
  );
}

export default App;
