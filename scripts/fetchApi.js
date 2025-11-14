async function fetchPokemon() {
    const response = await fetch(POKEMON_Load_URL);
    const data = await response.json();
    return data.results;
}

async function fetchPokemonData(data) {
    for (let index = 0; index < data.length; index++) {
        const element = data[index];
        const pokemonData = await fetch(element.url).then(r => r.json());
        pokemonList.push(pokemonData);
    }

}