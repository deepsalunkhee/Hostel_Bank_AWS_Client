import React from 'react'
import { BrowserRouter as Router ,Route,Routes} from 'react-router-dom'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import Group from './pages/Group'
import ForgotPassword from './pages/ForgotPassword'


const App = () => {
  return (
    <>
    
    <Router>
      <Routes>
        <Route path='/signin' element={<Signin/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/' element={<Dashboard/>}/>
        <Route path='/group/:groupid' element={<Group/>}/>
        <Route path='/forgotpassword' element={<ForgotPassword/>}/>
      </Routes>
    </Router>
    </>
  )
}

export default App

