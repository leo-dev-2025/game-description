import { useState } from 'react'
import GameList from './components/GameList'
import { Route, Routes } from 'react-router'
import Editor from './components/Editor'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
         <Routes>
            <Route path='/' element={<GameList/>} />
            <Route path="/editor" element={<Editor/>} />
         </Routes>
      </div>      
    </>
  )
}

export default App
