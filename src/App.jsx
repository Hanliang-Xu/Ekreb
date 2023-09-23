// Import necessary modules and components
import { useState } from 'react';
import Menu from './pages/Menu';
import Game from './pages/Game';
import Results from './pages/Results';
import './App.css';

function App() {
  // State variable to track the time limit for the game. Initially set to 3.
  const [timeLimit, setTimeLimit] = useState(3);
  
  // State variable to track the current page being displayed. Initially set to "menu".
  const [currentPage, setCurrentPage] = useState("menu");
  
  return (
    <>
      {/* Conditionally render the Menu page */}
      {currentPage === "menu" && (
        <Menu
          setCurrentPage={setCurrentPage}  // Passing a setter function to allow navigation
          setTimeLimit={setTimeLimit}      // Passing a setter function to update the time limit
        />
      )}

      {/* Conditionally render the Game page */}
      {currentPage === "game" && (
        <Game
          setCurrentPage={setCurrentPage}  // Passing a setter function to allow navigation
          timeLimit={timeLimit}            // Passing the time limit as a prop
        />
      )}

      {/* Conditionally render the Results page */}
      {currentPage === "results" && (
        <Results
          setCurrentPage={setCurrentPage}  // Passing a setter function to allow navigation
        />
      )}
    </>
  );
}

// Export the App component for use in other parts of the application
export default App;