import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './Threebox.js';
import App from './App';
import ThreeBoxes from './Threebox'
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.css'
import './index.css';

const MainPage = () => {
  const [doc_no, setDocNo] = useState('');
  const [doc_date, setDocDate] = useState('');
  const [doc_signer, setDocSigner] = useState('');

  return (
    <div>
      <App 
        setDocNo={setDocNo} 
        setDocDate={setDocDate}
        setDocSigner={setDocSigner}
      />
      <ThreeBoxes 
        doc_no={doc_no} 
        setDocNo={setDocNo}
        doc_date={doc_date}
        setDocDate={setDocDate}
        doc_signer={doc_signer}
        setDocSigner={setDocSigner}
      /> 
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <MainPage/>
  </React.StrictMode>,
);

// python -m http.server 1803
// 157.230.37.228

//  reportWebVitals();


