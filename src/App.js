import { useState } from 'react';
import './App.css';
import Quiz from './components/Quiz';

function App() {
  const [isStarted, setIsStarted] = useState(false);

  return (
    <div className="App">
      {!isStarted ?
        <div className="flex-center">
          <h1>Country Quiz</h1>
          <p>Quiz about countries with <a href="http://restcountries.com">Countries API</a></p>
          <button className="start" onClick={() => setIsStarted(true)}>Start</button>
        </div>
        :
        <Quiz backToMenu={() => setIsStarted(false)} />
      }
    </div>
  );
}

export default App;
