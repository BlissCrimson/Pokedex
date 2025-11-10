const BASE_URL = "https://pokeapi.co/api/v2/";
const BASE_IMG_URL = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/";
const POKEMON_TYPE_URL = ""
const limit = 20;
let offset = 20;
let POKEMON_Load_URL = BASE_URL + "pokemon?limit=20&offset=0";

const TypeData = {
    normal: { icon: "", color: "#A8A77A" },
    fighting: { icon: "", color: "#C22E28" },
    flying: { icon: "", color: "#A98FF3" },
    poison: { icon: "", color: "#A33EA1" },
    ground: { icon: "", color: "#E2BF65" },
    rock: { icon: "", color: "#B6A136" },
    bug: { icon: "", color: "#A6B91A" },
    ghost: { icon: "", color: "#735797" },
    steel: { icon: "", color: "#B7B7CE" },
    fire: { icon: "", color: "#EE8130" },
    water: { icon: "", color: "#6390F0" },
    grass: { icon: "", color: "#7AC74C" },
    electric: { icon: "", color: "#F7D02C" },
    psychic: { icon: "", color: "#F95587" },
    ice: { icon: "", color: "#96D9D6" },
    dragon: { icon: "", color: "#6F35FC" },
    dark: { icon: "", color: "#705746" },
    fairy: { icon: "", color: "#D685AD" },
    stellar: { icon: "", color: "background: #F72325; background: -moz - linear - gradient(left, #F72325 0 %, #2AF532 50 %, #951EF5 100 %); background: -webkit - linear - gradient(left, #F72325 0 %, #2AF532 50 %, #951EF5 100 %); background: linear - gradient(to right, #F72325 0 %, #2AF532 50 %, #951EF5 100 %); " },
    unknown: { icon: "", color: "#9DC1B7" },
    shadow: { icon: "", color: "background: #705746; background: -moz-linear-gradient(left, #705746 0%, #735797 100%); background: -webkit-linear-gradient(left, #705746 0%, #735797 100%); background: linear-gradient(to right, #705746 0%, #735797 100%);" }
}

const ID = [
    allPokemon = document.getElementById('allPokemon'),
    pokemonTypeRef = document.getElementById('pokemonType')
]

async function init() {
    const pokemonList = await fetchPokemon();
    // renderPokemon(pokemonList);
    showPokemon(pokemonList);
}

function openDialog() {
    dialogRef = document.getElementById('pokemonDialog');
    getPokemonDialogTemplate(pokemonList, indexPokemon);
    dialogRef.showModal();
}

function closeDialog() {
    dialogRef = document.getElementById('pokemonDialog');
    dialogRef.close();
}

async function fetchPokemon() {
    const response = await fetch(POKEMON_Load_URL);
    if (!allPokemon) {
        const data = await response.json();
        return data.results;
    }
}

// function renderPokemon(pokemonList) {
//     for (let indexPokemon = 0; indexPokemon < pokemonList.length; indexPokemon++) {
//         return indexPokemon;
//     }
// }

async function showPokemon(pokemonList) {
    for (let indexPokemon = 0; indexPokemon < pokemonList.length; indexPokemon++) {
        let pokemonImg = BASE_IMG_URL + (indexPokemon + 1) + ".png";
        const pokemonType = await fetchPokemonType(pokemonList, indexPokemon);
        document.getElementById('allPokemon').innerHTML += getAllPokemonTemplate(pokemonList, indexPokemon, pokemonImg, pokemonType);
    }
}

async function fetchPokemonType(pokemonList, indexPokemon) {
    let POKEMON_URL = BASE_URL + "pokemon/" + (indexPokemon + 1) + "/";
    dataType = await fetch(POKEMON_URL)
    type = await dataType.json();
    const pokemonType = type.types[0].type.name;
    return pokemonType;



    // const pokemonType = await dataType.json();
    // pokemonType = pokemonType.types
    // console.log(pokemonType.types[0].type.name);
    // console.log(type);

    // return pokemonType.results;

    // return pokemonType.results;

    // document.getElementById('pokemonType').innerHTML += pokemonType.types[0].type.name;
    // return pokemonType.types[0].type.name;
    // for (let i = 0; i < 1; i++) {
    //     let POKEMON_URL = BASE_URL + "pokemon/" + (indexPokemon + 1) + "/";
    //     const dataType = await fetch(POKEMON_URL)
    //     const pokemonType = await dataType.json();
    //     pokemonType = dataType.types[i].type.name;
    //     console.log(pokemonType.types[0].type.name);
    //     // return pokemonType.results;
    // }

    // for (let indexPokemonType = 0; indexPokemonType < pokemonType.length; indexPokemonType++) {

    //     if (indexPokemonType.length > 1) {
    //         return pokemonTypeRef.innerHTML = pokemonType[indexPokemonType]
    //     }
    //     if (pokemonType < 2) {

    //     }
    // }

    // return pokemonTypeRef.innerHTML;
}