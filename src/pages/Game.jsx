import { useEffect, useState } from 'react';
import CountdownClock from "react-countdown-clock";
import { Input, Button, notification } from 'antd';
import axios from 'axios';
import moment from 'moment';
import * as colors from "../standard-colors";

const minuteToSecond = 60;

function Game({setCurrentPage, timeLimit}) {
  let quizDuration = timeLimit * minuteToSecond;

  const [word, setWord] = useState(null);
  const [score, setScore] = useState(0);
  const [guess, setGuess] = useState('');
  const [countdown, setCountdown] = useState(quizDuration);

  const deadline = moment().add(quizDuration, "seconds");

  const fetchNewWord = () => {
    axios.get('http://localhost:3000/getWord')
      .then((response) => {
        setWord(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    axios.get('http://localhost:3000/startNewSession')
      .then(() => {
        fetchNewWord();
      })
      .catch(error => {
        console.error("Error starting a new session:", error);
      });

    axios.get('http://localhost:3000/resetScore')
      .then(() => {
        setScore(0);
      })
      .catch((error) => {
        console.log("Error resetting score:", error);
      });

    let scoreConfig = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'http://localhost:3000/score',
      headers: {}
    };

    axios.request(scoreConfig)
      .then((response) => {
        setScore(parseInt(response.data));
      })
      .catch((error) => {
        console.log(error);
      });

    const startCountdown = setInterval(() => {
      const now = moment();
      const currentTimeLeft = moment.duration(deadline.diff(now));
      if (currentTimeLeft.asSeconds() > 0) {
        setCountdown(currentTimeLeft.asSeconds());
      } else {
        clearInterval(startCountdown);
      }
    }, 1000);
  
    return () => clearInterval(startCountdown);
  }, []);


  const handleSubmit = () => {
    let config = {
      method: 'patch',
      maxBodyLength: Infinity,
      url: `http://localhost:3000/guessWord?word=${guess}`,
      headers: { }
    };

    axios.request(config)
      .then((response) => {
        if (response.data === true) {
          axios.get('http://localhost:3000/score')
            .then(scoreResponse => {
              setScore(parseInt(scoreResponse.data));
            });

          fetchNewWord();

          notification.success({
            message: "Correct!",
            description: "You guessed the word correctly!",
            placement: "bottomRight",
            duration: 2
          });
        } else {
          notification.error({
            message: "Incorrect!",
            description: "You guessed the word incorrectly!",
            placement: "bottomRight",
            duration: 2
          });
        }

        let configAttempt = {
          method: 'patch',
          maxBodyLength: Infinity,
          url: `http://localhost:3000/attempt`,
          headers: { }
        };
        axios.request(configAttempt)

        setGuess("");
      })
      .catch((error) => {
        console.log(error);
      });
  }
  
  return <div className='card'> 
    <CountdownClock
      seconds={quizDuration}
      showMilliseconds={true}
      timeFormat="hms"
      color={`${
        countdown < 10 && countdown >= 3
          ? colors.yellow // yellow warning for < 10 seconds left on countdown.
          : countdown < 3
          ? colors.red // red warning for less than 3s left on countdown.
          : colors.green
      }`}
      alpha={0.9}
      size={100}
      fontSize="auto"
      onComplete={() => setCurrentPage("results")}
    />
    <h2> Current word: {word} </h2>
    <Input size='large' placeholder='Enter your guess' value={guess}
      onChange={(input) => {setGuess(input.target.value); }}/>
    <br />
    <br />
    <Button type='primary' size='large' onClick={handleSubmit}>Submit</Button>
    <p> Score: {score} </p>
  </div>
}

export default Game