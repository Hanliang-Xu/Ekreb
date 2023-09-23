import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button } from 'antd';

function Results({setCurrentPage}) {
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);

  useEffect(() => {
    let configScore = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'http://localhost:3000/score',
      headers: { }
    };
    
    axios.request(configScore)
      .then((response) => {
        setScore(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    
    let configAttempts = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'http://localhost:3000/attempt',
      headers: { }
    };
    
    axios.request(configAttempts)
      .then((response) => {
        setAttempts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  })

  return <div className='card'> 
    <h1>Your score is: {score}</h1>
    <h1>You made {attempts} attempts</h1>
    <Button type='primary' size='large' onClick={() => setCurrentPage("menu")}>Wanna play again?</Button>
  </div>
}


export default Results