import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {RequiredAuthProvider, RedirectToLogin} from "@propelauth/react";
//import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <AuthProvider authUrl='https://8380017432.propelauthtest.com'>
    <App />
    </AuthProvider> */}
     <RequiredAuthProvider
    authUrl={'https://8380017432.propelauthtest.com'}
    //displayWhileLoading={<Loading />}
    displayIfLoggedOut={<RedirectToLogin />}
  >
    <App />
  </RequiredAuthProvider>
  </React.StrictMode>

);






