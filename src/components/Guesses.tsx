'use client';

import Country from "./Countries";

interface Props {
    countries: Country[];
    answer: Country;
}

export default function Guesses ({countries, answer}: Props) {
    const itemClass = "p-1 "
    const wrong = itemClass + "bg-red-500";
    const right = itemClass + "bg-green-500";
    const partial = itemClass + "bg-yellow-500";

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
        return itemClass;
    }

    function checkNumber(answer: number, country: number) {
        return ((answer < country) ? "higher" : "lower")
    }

    return (
        <table className="mx-auto text-xs/loose text-gray-50 dark:text-gray-400">
        <thead className="bg-gray-700">
            <tr>
            <th className="px-2">Name</th>
            <th className="px-2">Democracy Index</th>
            <th className="px-2">Population Density</th>
            <th className="px-2">Continent</th>
            <th className="px-2">Driving Side</th>
            <th className="px-2">Timezones</th>
            </tr>
        </thead>
        <tbody id="guessList">
            {countries.map((country: Country) =>
                <tr>
                    <td className={checkAnswer(country.cca2, answer.cca2)}>
                        <p className="">
                            {country.name.common} {country.name.official !== country.name.common ? " (" + country.name.official + ")": null}
                        </p>
                    </td>
                    <td className={checkAnswer(country.democracy_index, answer.democracy_index)}>{country.democracy_index}</td>
                    <td className={checkAnswer(country.population_density, answer.population_density)}>
                        <p>{country.population_density}</p>
                        <p>{
                            checkAnswer(country.population_density, answer.population_density) !== right 
                            ? checkNumber(country.population_density, answer.population_density) : null
                        }</p>
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