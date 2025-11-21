function searchPokemonNames() {
    const filterWord = document.getElementById('search').value.toLowerCase();
    if (filterWord.length >= 1) {
        currentNames = pokemonList.filter(p => p.name.toLowerCase().includes(filterWord));
    } else {
        currentNames = [];
    }
    renderSearchResults();
    updateLoadMoreButtonText();
}
function renderSearchResults() {
    const pokeContainer = document.getElementById('allPokemon');
    if (currentNames.length === 0) {
        pokeContainer.innerHTML = getNoSearchTemplate(document.getElementById('search').value);
        return;
    }

    let html = "";
    for (let i = 0; i < currentNames.length; i++) {      // <-- loop over filtered array
        const globalIndex = pokemonList.indexOf(currentNames[i]);
        const icons = getPokemonTypeIcons(globalIndex);   // icons aus pokemonList holen
        html += getFilteredPokemonTemplate(i, icons, currentNames[i]);  // i = filteredIndex
    }
    pokeContainer.innerHTML = html;
}

function clearSearch() {
    const searchInput = document.getElementById('search');
    searchInput.value = "";
    currentNames = [];
    renderAllPokemon();
}

function renderAllPokemon() {
    const pokeContainer = document.getElementById('allPokemon');
    let html = "";
    for (let i = 0; i < pokemonList.length; i++) {
        const icons = getPokemonTypeIcons(i);
        html += getAllPokemonTemplate(i, icons);
    }
    pokeContainer.innerHTML = html;
}

function updateLoadMoreButtonText() {
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    const filterWord = document.getElementById('search').value.toLowerCase();

    if (filterWord.length >= 1) {
        loadMoreBtn.classList.remove('btn-plus-pokemon');
        loadMoreBtn.classList.add('btn-search-more');
        loadMoreBtn.innerText = `Load more results for "${filterWord}"`;
    } else {
        loadMoreBtn.innerText = 'Load More';
    }
}