import { Button, Select } from 'antd';
import axios from 'axios';

function Menu({setCurrentPage, setTimeLimit}) {
  const handleTimeLimitChange = (value) => {
    setTimeLimit(value);
  };

  const handleDifficultyChange = (value) => {
    let config = {
      method: 'patch',
      maxBodyLength: Infinity,
      url: `http://localhost:3000/setWordLength?val=${value}`,
      headers: { }
    };
    axios.request(config)
  }

  return <div>
    <h1>Word Guessing Game!</h1>
    <Select
      defaultValue="3 minutes"
      style={{
        width: 200,
      }}
      onChange={handleTimeLimitChange}
      options={[
        {
          value: 1,
          label: '1 minutes',
        },
        {
          value: 3,
          label: '3 minutes',
        },
        {
          value: 10,
          label: '10 minutes',
        },
      ]}
    />
    <br /> <br />

    <Select
      defaultValue="Medium"
      style={{
        width: 200,
      }}
      onChange={handleDifficultyChange}
      options={[
        {
          value: 4,
          label: 'Easy (<= 4 chars)',
        },
        {
          value: 7,
          label: 'Medium (<= 7 chars)',
        },
        {
          value: 10,
          label: 'Hard (<= 10 chars)',
        },
      ]}
    />
    <br /> <br />

    <Button type='primary' size='large' onClick={() => setCurrentPage("game")}>Start</Button>
  </div>
}

export default Menu