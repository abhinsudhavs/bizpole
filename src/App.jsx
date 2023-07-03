import { useState } from 'react'
import reactLogo from './assets/react.svg'
import Login from './components/Login/Login'
import viteLogo from '/vite.svg'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css';
import TestPage from './components/TestPage/TestPage'
import { Provider } from 'react-redux'
import store from './components/Redux/store'
import ResultsPage from './components/ResultPage/ResultsPage'
import SignUp from './components/SignUp/SignUp'

function App() {

  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/test' element={<TestPage />} />
          <Route path='/testresult' element={< ResultsPage/>} />
        </Routes>
      </Router>
      {/* <Login /> */}
    </Provider>
  )
}

export default App
