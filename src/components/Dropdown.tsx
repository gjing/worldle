'use client';

import Select from 'react-select';
import Country from './Countries';
import { GUESSRIGHT, GUESSWRONG } from './Constants';

interface Props {
    countries: Country[];
    setGuesses: (arg0: Country[]) => void;
    guesses: Country[];
    answer: Country;
    setStatus: (arg0: number) => void;
    setOpenModal: (arg0: boolean) => void;
}

export default function Dropdown({countries, setGuesses, guesses, answer, setStatus, setOpenModal}: Props) {

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
            setStatus(GUESSRIGHT);
            setOpenModal(true);
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
        setGuesses([getCountryFromCCA(e), ...guesses]);
        if (guesses.length < 4) {
            checkAnswer(answer, e);
        } else {
            setStatus(GUESSWRONG);
            setOpenModal(true);
        }
    }

    return (
        <div className="items-center justify-center m-8">
        <Select
            options={setOptions()}
            onChange={
                (e) => {(e) ? updateState(e.value) : null}
            }
        />
        </div>
    )
}