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
            const icons = getPokemonTypeIcons(index);
            document.getElementById('allPokemon').innerHTML += getAllPokemonTemplate(index, icons);
        } catch (error) {
            console.error(`Fehler bei ${element.name}:`, error);
        }
    }
}

async function fetchNextPokemon() {
    const NEXT_LOAD_URL = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
    const response = await fetch(NEXT_LOAD_URL);
    const data = await response.json();

    for (let index = 0; index < data.results.length; index++) {
        const element = data.results[index];
        try {
            const pokemonData = await fetch(element.url).then(r => r.json())
            pokemonList.push(pokemonData);
            const globalIndex = pokemonList.length - 1;
            const iconsHTML = getPokemonTypeIcons(globalIndex);
            document.getElementById('allPokemon').innerHTML += getAllPokemonTemplate(globalIndex, iconsHTML);
        } catch (error) {
            console.error(`Fehler bei ${element.name}:`, error);
        }
    }
    offset += limit;
    return pokemonList;
}