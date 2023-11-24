import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import App from './App.jsx'
import './index.css'
import FavoriteCountries from './components/FavoriteCountries.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<App />} />
          <Route path='/favCountries' element={<FavoriteCountries />} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>,
  )