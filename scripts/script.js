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
        renderNames();
    }, 2000);
}

// Open/close Dialog
async function openDialog(index) {
    let dialogRef = document.getElementById('pokemonDialog');
    index = dialogIndex(index);
    if (index === null) return;
    const iconsHTML = getPokemonTypeIcons(index);
    document.getElementById('pokemonDialog').innerHTML = getPokemonDialogTemplate(index, iconsHTML);
    updateRefs();
    dialogRef.classList.forEach(cls => {
        if (cls.startsWith("bg_")) dialogRef.classList.remove(cls);
    });
    let pokemonType = pokemonList[index].types[0].type.name;
    dialogRef.showModal();
    document.body.classList.add("no-scroll");
    dialogRef.classList.add(`bg_${pokemonType}`);
}

function dialogIndex(index) {
    if (index < 0) {
        index = pokemonList.length - 1;
    }
    if (index > pokemonList.length - 1) {
        index = 0;
    }
    if (!pokemonList[index]) {
        console.error("Ungültier Pokemon Index", index);
        return null;
    }
    return index;
}

function closeDialog(index) {
    let dialogRef = document.getElementById('pokemonDialog');
    let pokemonType = pokemonList[index].types[0].type.name;
    dialogRef.classList.remove(`bg_${pokemonType}`);
    dialogRef.close();
    document.body.classList.remove("no-scroll");
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
        pokemonList = await fetchNextPokemon();
    } catch (error) {
        console.error("Fehler beim Initialisieren:", error)
    }
    setTimeout(() => {
        hideSpinner();
    }, 2000);
}

// search function
function renderNames() {
    const pokeContainer = document.getElementById('allPokemon');

    const filterWord = document.getElementById('search').value.toLowerCase();
    if (filterWord.length >= 1 && currentNames.length === 0) {
        document.getElementById('allPokemon').innerHTML = getNoSearchTemplate(filterWord);
        return;
    }
    let search = "";
    if (currentNames.length === 0) {
        search = noSearch();
    } else {
        search = renderSearch();
    }
    pokeContainer.innerHTML = search;
}

function noSearch() {
    let search = "";
    for (let i = 0; i < pokemonList.length; i++) {
        const icons = getPokemonTypeIcons(i);
        search += getAllPokemonTemplate(i, icons);
    }
    return search;
}

function renderSearch() {
    let search = "";
    for (let i = 0; i < currentNames.length; i++) {
        const searchIndex = pokemonList.indexOf(currentNames[i]);
        const icons = getPokemonTypeIcons(searchIndex);
        search += getAllPokemonTemplate(searchIndex, icons);
    }
    return search;
}

function searchPokemonNames(filterWord) {
    filterWord = document.getElementById('search').value.toLowerCase();
    if (filterWord.length >= 1) {
        currentNames = pokemonList.filter(p => p.name.toLowerCase().includes(filterWord));
    } else {
        currentNames = [];
    }
    renderNames();
}