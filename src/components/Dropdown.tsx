'use client';

import Select from 'react-select';
import Country from './Countries';

interface Props {
    countries: Country[];
    setGuesses: (arg0: Country[]) => void;
    guesses: Country[];
    answer: Country;
    setStatus: (arg0: string) => void;
}

export default function Dropdown({countries, setGuesses, guesses, answer, setStatus}: Props) {
    function getCountryFromCCA(cca: string) {
        const country = countries.find((c) => c.cca2 === cca)
        if (country) {
            return country;
        } else {
            throw new Error("cca2 Country Error");
        }
    }

    function checkAnswer(answer: Country, guess: string) {
        if (answer.cca2 === guess) {
            setStatus("finished");
        }
    }
    
    function setOptions() {
        const options: {label: string, value: string}[] = []
        countries.forEach((country: Country) => {
            const label = (country.name.common == country.name.official ? country.name.common : country.name.common + ' (' + country.name.official + ')');
            options.push({
                "value": country.cca2,
                "label": label
            })
        });
        options.sort((a,b) => (a.label > b.label) ? 1 : ((b.label > a.label) ? -1 : 0))
        return options
    }

    function updateState(e: string) {
        if (guesses.length < 5 ) {
            setGuesses([getCountryFromCCA(e), ...guesses]);
        }
        checkAnswer(answer, e);
    }

    return (
        <Select
            options={setOptions()}
            onChange={
                (e) => {(e) ? updateState(e.value) : null}
            }
        />)
}