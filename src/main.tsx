import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter as Router } from 'react-router-dom'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from './assets/Navbar.tsx'


createRoot(document.getElementById('root')!).render(
<Router>
<ToastContainer position="top-right" autoClose={3000} />
<Navbar />
    <App />
    </Router>
)
