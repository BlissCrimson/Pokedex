async function fetchPokemon() {
    const response = await fetch(POKEMON_Load_URL);
    const data = await response.json();
    return data.results;
}

async function fetchPokemonData(data) {
    pokemonList = [];
    document.getElementById('allPokemon').innerHTML = "";
    for (let index = 0; index < data.length; index++) {
        const element = data[index];
        try {
            const pokemonData = await fetch(element.url).then(r => r.json())
            pokemonList.push(pokemonData);
            const icons = getPokemonTypeIcons(pokemonList.length - 1);
            document.getElementById('allPokemon').innerHTML += getAllPokemonTemplate(index, icons, pokemonData);
        } catch (error) {
            console.error(`Fehler bei ${element.name}:`, error);
        }
    }
}

async function fetchNextPokemon() {
    const NEXT_LOAD_URL = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
    const response = await fetch(NEXT_LOAD_URL);
    const data = await response.json();
    offset += limit;

    const newPokemon = [];
    for (let element of data.results) {
        try {
            const pokemonData = await fetch(element.url).then(r => r.json());
            newPokemon.push(pokemonData);
        } catch (error) {
            console.error(`Fehler bei ${element.name}:`, error);
        }
    }
    return newPokemon;
}