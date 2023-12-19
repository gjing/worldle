import seedrandom from 'seedrandom';
import data from './assets/countries.json'
import Guesses from './components/Guesses';
import { useEffect, useRef, useState } from 'react';
import Dropdown from './components/Dropdown';
import Country from './components/Countries';
import ResultsModal from './components/Results';
import { GUESSING } from './components/Constants';

function App() {
  const didMount = useRef(false);
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  const seed = year.toString() + month.toString() + day.toString();
  const gen = seedrandom(seed);
  const rand = Math.round(gen() * data.length);
  const answer = data[rand]

  let g = localStorage.getItem(seed);
  if (g === null) {
    g = '[]';
  }

  const [guesses, setGuesses] = useState<Country[]>(JSON.parse(g));
  const [status, setStatus] = useState(GUESSING);
  const [openModal, setOpenModal] = useState(guesses.length > 4);

  useEffect(() => {
    console.log(guesses);
    console.log(didMount.current);
    if ( !didMount.current ) {
      didMount.current = true;
      return;
    }
    localStorage.setItem(seed, JSON.stringify(guesses))
  }, [guesses, seed])

  return (
    <div>
      <div className="container mx-auto text-center bg-blue-900 rounded-lg max-w-xl">
        <h1 className="text-3xl font-bold m-8 pt-4 text-slate-50">WORLDLE</h1>
        <h1 className="text-3xl font-bold m-8 text-slate-50">Countries</h1>
        <div className={(status === GUESSING) ? "visible" : "collapse"}>
          <Dropdown
            countries={data}
            setGuesses={setGuesses}
            guesses={guesses}
            answer={answer}
            setStatus={setStatus}
            setOpenModal={setOpenModal}
          />
        </div>
        <div className="m-1 pb-4 relative overflow-x-auto rounded-lg">
          <Guesses 
            countries={guesses}
            answer={answer}
          />
        </div>
        <a href="https://github.com/gjing/worldle" target="_blank" rel="noopener noreferrer" className=" m-2 p-4 inline-flex items-center justify-center h-9 mr-3 px-3 text-xs font-medium text-gray-900 bg-white border border-gray-200 rounded-lg focus:outline-none hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-500 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
          <svg className="w-3.5 h-3.5 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z" clip-rule="evenodd"></path>
          </svg> View Source
        </a>
      </div>
      <ResultsModal 
        openModal={openModal}
        setOpenModal={setOpenModal}
        status={status}
        answer={answer}
      />
    </div>
  );
}

export default App
