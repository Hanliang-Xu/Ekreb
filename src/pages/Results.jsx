// Import necessary modules and components
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button } from 'antd';

function Results({ setCurrentPage }) {
  // States for storing score and attempts
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);

  // useEffect to fetch score and attempts once the component is mounted
  useEffect(() => {
    // Configuration for the request to fetch the score
    let configScore = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'http://localhost:3000/score',
      headers: {}
    };

    // Fetching the score
    axios.request(configScore)
      .then((response) => {
        setScore(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    // Configuration for the request to fetch the number of attempts
    let configAttempts = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'http://localhost:3000/attempt',
      headers: {}
    };

    // Fetching the number of attempts
    axios.request(configAttempts)
      .then((response) => {
        setAttempts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    // Empty dependency array to ensure this effect runs only once when the component mounts
  }, []);

  // Render the results and provide an option to play again
  return (
    <div className='card'>
      <h1>Your score is {score}</h1>
      <h1>You made {attempts} attempts</h1>
      <Button type='primary' size='large' onClick={() => setCurrentPage("menu")}>Wanna play again?</Button>
    </div>
  );
}

// Exporting the Results component for use in other parts of the application
export default Results;