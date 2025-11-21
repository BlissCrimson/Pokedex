// start function, onload from body
async function init() {
    showSpinner();
    try {
        pokemonList = await fetchPokemon();
        await fetchPokemonData(pokemonList);
    } catch (error) {
        console.error("Fehler beim Initialisieren:", error)
    }
    currentNames = pokemonList;
    setTimeout(() => {
        hideSpinner();
        renderSearchResults();
    }, 2000);
}

// Open/close Dialog
/**
 * open normal Dialog
 * @param {number} index - Index for pokemonList-Array
 */
async function openDialog(index) {
    let dialogRef = document.getElementById('pokemonDialog');
    resetDialogBg(dialogRef);
    if (index < 0) {
        index = pokemonList.length - 1;
    }
    if (index > pokemonList.length - 1) {
        index = 0;
    }
    if (!pokemonList[index]) {
        console.error("Ungültier Pokemon Index", index);
        return;
    }
    const iconsHTML = getPokemonTypeIcons(index);
    document.getElementById('pokemonDialog').innerHTML = getPokemonDialogTemplate(index, iconsHTML);
    updateRefs();
    let pokemonType = pokemonList[index].types[0].type.name;
    dialogRef.classList.add(`bg_${pokemonType}`);
    dialogRef.showModal();
    document.body.classList.add("no-scroll");
}

function openDialogFiltered(filteredIndex) {
    const dialogRef = document.getElementById('pokemonDialog');
    if (filteredIndex < 0) filteredIndex = currentNames.length - 1;
    if (filteredIndex >= currentNames.length) filteredIndex = 0;
    const pokemon = currentNames[filteredIndex];
    dialogRef.innerHTML = getFilteredPokemonDialogTemplate(filteredIndex);
    updateRefs();
    resetDialogBg(dialogRef);
    const pokemonType = pokemon.types[0].type.name;
    dialogRef.classList.add(`bg_${pokemonType}`);
    dialogRef.showModal();
    document.body.classList.add("no-scroll");
}

/**
 * remove all bg_ classes from Dialog
 * @param {HTMLElement} dialogRef 
 */
function closeDialog() {
    const dialogRef = document.getElementById('pokemonDialog');
    resetDialogBg(dialogRef);
    dialogRef.close();
    document.body.classList.remove("no-scroll");
}

function resetDialogBg(dialogRef) {
    const bgClasses = Array.from(dialogRef.classList).filter(c => c.startsWith("bg_"));
    bgClasses.forEach(c => dialogRef.classList.remove(c));
}

function getPokemonTypeIcons(index) {
    updateRefs(index);
    const firstAttribut = pokemonList[index].types[0].type.name;
    const firstType = TypeData[firstAttribut];
    const firstTypeIcon = firstType?.icon;

    const secondAttribut = pokemonList[index].types[1]?.type?.name;
    const secondType = secondAttribut ? TypeData[secondAttribut] : null;
    const secondTypeIcon = secondType?.icon;

    let iconsHTML = "";
    if (firstTypeIcon) {
        iconsHTML += getFirstTypeTemplate(firstAttribut, firstTypeIcon);
    }
    if (secondTypeIcon) {
        iconsHTML += getSecondTypeTemplate(secondAttribut, secondTypeIcon);
    }
    return iconsHTML;
}

function updateRefs() {
    pokemonFirstDetailsRef = document.getElementById('pokemonFirstDetails');
    pokemonSecondDetailsRef = document.getElementById('pokemonSecondDetails');
    pokemonThirdDetailsRef = document.getElementById('pokemonThirdDetails');
    pokemonType1Ref = document.getElementById('pokemonType1');
    pokemonType2Ref = document.getElementById('pokemonType2');
}

function toggleFirstDetails() {
    pokemonFirstDetailsRef.classList.remove('d_none');
    pokemonThirdDetailsRef.classList.add('d_none');
    pokemonSecondDetailsRef.classList.add('d_none');
}

function toggleSecondDetails() {
    pokemonSecondDetailsRef.classList.remove('d_none');
    pokemonThirdDetailsRef.classList.add('d_none');
    pokemonFirstDetailsRef.classList.add('d_none');
}

function toggleThirdDetails() {
    pokemonThirdDetailsRef.classList.remove('d_none');
    pokemonFirstDetailsRef.classList.add('d_none');
    pokemonSecondDetailsRef.classList.add('d_none');
}

async function nextPokemon() {
    showSpinner();
    try {
        const newPokemon = await fetchNextPokemon();
        pokemonList = pokemonList.concat(newPokemon);

        const filterWord = document.getElementById('search').value.toLowerCase();
        if (filterWord.length >= 1) {

            currentNames = pokemonList.filter(p => p.name.toLowerCase().includes(filterWord));
        } else {

            currentNames = pokemonList;
        }
        renderSearchResults();
        updateLoadMoreButtonText();
    } catch (error) {
        console.error("Fehler beim Laden der nächsten Pokémon:", error);
    }
    hideSpinner();
}