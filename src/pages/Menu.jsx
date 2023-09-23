// Import necessary components and modules
import { Button, Select } from 'antd';
import axios from 'axios';

function Menu({ setCurrentPage, setTimeLimit }) {
  
  // Function to handle changes in the time limit selection
  const handleTimeLimitChange = (value) => {
    setTimeLimit(value);
  };

  // Function to handle changes in the difficulty selection and update word length
  const handleDifficultyChange = (value) => {
    let config = {
      method: 'patch',
      maxBodyLength: Infinity,
      url: `http://localhost:3000/setWordLength?val=${value}`,
      headers: {}
    };
    
    axios.request(config);
  }

  return (
    <div>
      <h1>Word Guessing Game!</h1>
      
      {/* Dropdown selection for game time limit */}
      <Select
        defaultValue="3 minutes"
        style={{ width: 200 }}
        onChange={handleTimeLimitChange}
        options={[
          { value: 1, label: '1 minute' },
          { value: 3, label: '3 minutes' },
          { value: 10, label: '10 minutes' },
        ]}
      />
      <br /> <br />
      
      {/* Dropdown selection for game difficulty level */}
      <Select
        defaultValue="Medium"
        style={{ width: 200 }}
        onChange={handleDifficultyChange}
        options={[
          { value: 4, label: 'Easy (<= 4 chars)' },
          { value: 7, label: 'Medium (<= 7 chars)' },
          { value: 10, label: 'Hard (<= 10 chars)' },
        ]}
      />
      <br /> <br />
      
      {/* Start game button */}
      <Button 
        type='primary' 
        size='large' 
        onClick={() => setCurrentPage("game")}
      >
        Start
      </Button>
    </div>
  );
}

// Export the Menu component for use in other parts of the application
export default Menu;