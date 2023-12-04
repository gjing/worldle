import seedrandom from 'seedrandom';
import data from './assets/countries.json'
import Guesses from './components/Guesses';
import { useState } from 'react';
import Dropdown from './components/Dropdown';
import Country from './components/Countries';

function App() {
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  const seed = year.toString() + month.toString() + day.toString();
  const gen = seedrandom(seed);
  const rand = Math.round(gen() * data.length);
  const answer = data[rand]
  console.log(answer);

  const [guesses, setGuesses] = useState<Country[]>([]);
  const [status, setStatus] = useState("");

  return (
    <div>
      <h1 className="text-3xl font-bold underline">Date</h1>
      <div>
        {status}
      </div>
      <h1 className="text-3xl font-bold underline">Random</h1>
      <div >
        {rand} 
      </div>
      <h1 className="text-3xl font-bold underline">Countries</h1>
      <div className="items-center justify-center">
        <Dropdown
          countries={data}
          setGuesses={setGuesses}
          guesses={guesses}
          answer={answer}
          setStatus={setStatus}
        />
      </div>
      <div>
        <Guesses 
          countries={guesses}
          answer={answer}
        />
      </div>
    </div>
  );
}

export default App
