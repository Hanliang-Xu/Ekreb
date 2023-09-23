import { useState, useEffect } from 'react'
import Menu from './pages/Menu'
import Game from './pages/Game'
import Results from './pages/Results'
import './App.css'

function App() {
  const [timeLimit, setTimeLimit] = useState(3);
  const [currentPage, setCurrentPage] = useState("menu");

  
  return (
    <>
      <h1> Ekreb </h1>
      {currentPage === "menu" && (
        <Menu
          setCurrentPage={setCurrentPage}
          setTimeLimit={setTimeLimit}
        />
      )}

      {currentPage === "game" && (
        <Game
          setCurrentPage={setCurrentPage}
          timeLimit={timeLimit}
        />
      )}

      {currentPage === "results" && (
        <Results
          setCurrentPage={setCurrentPage}
        />
      )}
    </>
  )
}

export default App
