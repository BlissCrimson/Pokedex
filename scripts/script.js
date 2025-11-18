// start function, onload from body
async function init() {
    // loadingSpinner();
    try {
        pokemonList = await fetchPokemon();
        await fetchPokemonData(pokemonList);
    } catch (error) {
        console.error("Fehler beim Initialisieren:", error)
    }
    currentNames = pokemonList;
    // renderNames();
    renderNames();
}

// Open/close Dialog
async function openDialog(index) {
    let dialogRef = document.getElementById('pokemonDialog');
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
}

function closeDialog(index) {
    let dialogRef = document.getElementById('pokemonDialog');
    let pokemonType = pokemonList[index].types[0].type.name;
    dialogRef.classList.remove(`bg_${pokemonType}`)
    dialogRef.close();
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
        iconsHTML += `
        <div class="type-icon d_flex_c_c bg_${firstAttribut}">
            <img class="symbol-type" src="${firstTypeIcon}" alt="${firstAttribut}">
        </div>
    `;
    }
    if (secondTypeIcon) {
        iconsHTML += `
        <div class="type-icon d_flex_c_c bg_${secondAttribut}">
            <img class="symbol-type" src="${secondTypeIcon}" alt="${secondAttribut}">
        </div>
    `;
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
    // loadingSpinner();
    try {
        pokemonList = await fetchNextPokemon();
        // await fetchPokemonData(pokemonList);
        offset += limit;
    } catch (error) {
        console.error("Fehler beim Initialisieren:", error)
    }

}

// search function
function renderNames() {
    const pokeContainer = document.getElementById('allPokemon');
    let search = "";
    if (currentNames.length === 0) {
        for (let i = 0; i < pokemonList.length; i++) {
            const icons = getPokemonTypeIcons(i);
            search += getAllPokemonTemplate(i, icons);
        }
    } else {
        for (let i = 0; i < currentNames.length; i++) {
            const searchIndex = pokemonList.indexOf(currentNames[i]);
            const icons = getPokemonTypeIcons(searchIndex);
            search += getAllPokemonTemplate(searchIndex, icons);
        }
    }
    pokeContainer.innerHTML = search;
}

function searchPokemonNames(filterWord) {
    filterWord = document.getElementById('search').value.toLowerCase();
    if (filterWord.length >= 3) {
        currentNames = pokemonList.filter(p => p.name.toLowerCase().includes(filterWord));
    } else {
        currentNames = [];
    }
    renderNames();
}