function getAllPokemonTemplate(pokemonList, indexPokemon, pokemonImg, pokemonType) {
    // console.table(pokemonType);
    return `
        <div onclick="openDialog(${indexPokemon}) class="mini-pokemon">
            <header class="mini-pokemon-header">
                <h2>#${indexPokemon + 1}</h2>
                <h2>
                    ${pokemonList[indexPokemon].name}
                </h2>
            </header>
            <main class="mini-pokemon-main ${pokemonType}">
                <img class="mini-pokemon-img" src="${pokemonImg}" alt="${pokemonList[indexPokemon].name}">
            </main>
            <footer id="pokemonType" class="mini-pokemon-footer">
                ${pokemonType}
                <img src="" alt="">
            </footer>
        </div>
    `
}

function getPokemonDialogTemplate(pokemonList, indexPokemon) {
    return `
        <header id="headerDialog" class="header-dialog">
            <h2>${pokemonList[indexPokemon].name}</h2>
        </header>
        <main id="mainDialog" class="main-dialog">
            <img src="" alt="${pokemonList[indexPokemon].name}">
            
        </main>
    `
}