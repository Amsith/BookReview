import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './components/Auth/Login'
import Register from './components/Auth/Register'
import Table from './components/views/Table'
import Form from './components/views/Form'
import Edit from './components/views/Edit'
import About from './components/views/About'


function App() {

  return (
    <>
      <BrowserRouter future={{ v7_relativeSplatPath: true }}>
        <Routes>
          <Route path='/register' element={<Register />} />
          <Route path='/' element={<Login />} />
          <Route path='/table' element={<Table/>} />
          <Route path='/form' element={<Form/>} />
          <Route path='/edit/:id' element={<Edit />} />
          <Route path='/about/:id' element={<About />} />

        </Routes>

      </BrowserRouter>

    </>
  )
}

export default App
