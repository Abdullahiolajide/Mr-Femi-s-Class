import { Route, Router } from 'react-router-dom'
import { Routes } from 'react-router-dom'
import './App.css'
import Todo from './Components/Todo'

function App() {

  return (
    <>
    <Routes>
      <Route path='/' element={<Todo/>} />
    </Routes>
      {/* <Route />
    </Router> */}
    </>
  )
}

export default App
