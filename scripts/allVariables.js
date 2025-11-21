// all global defiend url's
const BASE_URL = "https://pokeapi.co/api/v2/";
const POKEMON_Load_URL = BASE_URL + "pokemon?limit=20&offset=0";
const POKEMON_TYPE_URL = ""

const spriteCache = {};

const allPokemon = document.getElementById('allPokemon');
const dialogRef = document.getElementById('pokemonDialog');
const searchResults = document.getElementById('searchResults');

let pokemonFirstDetailsRef = document.getElementById('pokemonFirstDetails');
let pokemonSecondDetailsRef = document.getElementById('pokemonSecondDetails');
let pokemonThirdDetailsRef = document.getElementById('pokemonThirdDetails');
let pokemonList = [];
let actuallyList = pokemonList;
let limit = 20;
let offset = 20;
let icons


let pokemonNames = [];
let currentNames = [];

let TypeData = {
    bug: { icon: "./assets/icons/pokeTypes/bug.svg", color: "#A6B91A" },
    dark: { icon: "./assets/icons/pokeTypes/dark.svg", color: "#705746" },
    dragon: { icon: "./assets/icons/pokeTypes/dragon.svg", color: "#6F35FC" },
    electric: { icon: "./assets/icons/pokeTypes/electric.svg", color: "#F7D02C" },
    fairy: { icon: "./assets/icons/pokeTypes/fairy.svg", color: "#D685AD" },
    fighting: { icon: "./assets/icons/pokeTypes/fighting.svg", color: "#C22E28" },
    fire: { icon: "./assets/icons/pokeTypes/fire.svg", color: "#EE8130" },
    flying: { icon: "./assets/icons/pokeTypes/flying.svg", color: "#A98FF3" },
    ghost: { icon: "./assets/icons/pokeTypes/ghost.svg", color: "#735797" },
    grass: { icon: "./assets/icons/pokeTypes/grass.svg", color: "#7AC74C" },
    ground: { icon: "./assets/icons/pokeTypes/ground.svg", color: "#E2BF65" },
    ice: { icon: "./assets/icons/pokeTypes/ice.svg", color: "#96D9D6" },
    normal: { icon: "./assets/icons/pokeTypes/normal.svg", color: "#A8A77A" },
    poison: { icon: "./assets/icons/pokeTypes/poison.svg", color: "#A33EA1" },
    psychic: { icon: "./assets/icons/pokeTypes/psychic.svg", color: "#F95587" },
    rock: { icon: "./assets/icons/pokeTypes/rock.svg", color: "#B6A136" },
    steel: { icon: "./assets/icons/pokeTypes/steel.svg", color: "#B7B7CE" },
    water: { icon: "./assets/icons/pokeTypes/water.svg", color: "#6390F0" },
}