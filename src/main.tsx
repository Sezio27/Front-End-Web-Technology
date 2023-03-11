import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import CheckoutForm from "./components/Forms/CheckoutForm";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <CheckoutForm />
  </React.StrictMode>,
)
