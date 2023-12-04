'use client';

import Country from "./Countries";

interface Props {
    countries: Country[];
    answer: Country;
}

export default function Guesses ({countries, answer}: Props) {
    const wrong = "bg-red-500";
    const right = "bg-green-500";
    const partial = "bg-yellow-500";

    function checkAnswer(answer: number | string | Array<string>, country: number | string | Array<string>) {
        if (answer.constructor === Array && country.constructor === Array) {
            if (JSON.stringify(answer)==JSON.stringify(country)) {
                return right;
            } else if(answer.some(item => country.includes(item)) ) {
                return partial;
            } else {
                return wrong;
            }
        } else {
            return ((answer === country) ? right : wrong)
        }
    }

    function checkNumber(answer: number, country: number) {
        return ((answer < country) ? "higher" : "lower")
    }

    return (
        <table>
        <thead>
            <tr>
            <th>Name</th>
            <th>Democracy Index</th>
            <th>Population Density</th>
            <th>Continent</th>
            <th>Driving Side</th>
            <th>Timezones</th>
            </tr>
        </thead>
        <tbody id="guessList">
            {countries.map((country: Country) =>
                <tr>
                    <td className={checkAnswer(country.cca2, answer.cca2)}>
                        <div>
                            {country.name.common} {country.name.official !== country.name.common ? " (" + country.name.official + ")": null}
                        </div>
                    </td>
                    <td className={checkAnswer(country.democracy_index, answer.democracy_index)}>{country.democracy_index}</td>
                    <td className={checkAnswer(country.population_density, answer.population_density)}>
                        <div>{country.population_density}</div>
                        <div>{
                            checkAnswer(country.population_density, answer.population_density) !== right 
                            ? checkNumber(country.population_density, answer.population_density) : null
                        }</div>
                    </td>
                    <td className={checkAnswer(country.continents, answer.continents)}>
                        {country.continents.map((item) =>
                            <div>
                                {item}
                            </div>
                        )}</td>
                    <td className={checkAnswer(country.car.side, answer.car.side)}>{country.car.side}</td>
                    <td className={checkAnswer(country.timezones, answer.timezones)}>
                        {country.timezones.map((item) =>
                            <div>
                                {item}
                            </div>
                        )}
                    </td>
                </tr>
            )}
        </tbody>
        </table>
    )
}