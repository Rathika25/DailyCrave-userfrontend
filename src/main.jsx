import React from 'react'
import ReactDOM from 'react-dom/client'

import {BrowserRouter} from 'react-router-dom'
import StoreContextProvider from './context/StoreContext'
import './index.css'

import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  
  <StoreContextProvider>
    <BrowserRouter> 
    <App/>
     </BrowserRouter>
    </StoreContextProvider>
   
   
    
  
  </React.StrictMode>
);
