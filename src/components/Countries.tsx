export default interface Country {
    name: {official: string, common: string},
    cca2: string,
    timezones: string[],
    democracy_index: string,
    car: {side: string},
    population_density: number,
    continents: Array<string>
}