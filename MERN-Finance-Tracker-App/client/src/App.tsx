import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Auth } from './pages/auth';
import { Dashboard } from './pages/dashboard';
const App = () => {
  return (
    <div>
      <BrowserRouter>
        {""}
        <div className="p-14 bg-blue-300">
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/auth' element={<Auth />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App