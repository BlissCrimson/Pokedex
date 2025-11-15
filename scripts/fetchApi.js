async function fetchPokemon() {
    const response = await fetch(POKEMON_Load_URL);
    const data = await response.json();
    return data.results;
}

async function fetchPokemonData(data) {
    pokemonList = [];
    for (let index = 0; index < data.length; index++) {
        const element = data[index];
        try {
            const pokemonData = await fetch(element.url).then(r => r.json())
            pokemonList.push(pokemonData);
            getPokemonDatas(index);
            document.getElementById('allPokemon').innerHTML += getAllPokemonTemplate(index);
        } catch (error) {
            console.error(`Fehler bei ${element.name}:`, error);
        }
    }
}