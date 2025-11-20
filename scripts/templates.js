function getAllPokemonTemplate(idx, icons,pokemon) {
    const typeName = pokemon.types?.[0]?.type?.name || "normal";
    
    return `
        <div onclick="openDialog(${idx})" class="mini-pokemon shadow_${typeName}">
            <header class="mini-pokemon-header">
                <h2>#${pokemon.id}</h2>
                <h2>
                    ${pokemon.name}
                </h2>
            </header>
            <main class="mini-pokemon-main bg_${typeName}">
                <img class="mini-pokemon-img" src="${pokemon.sprites.other.home.front_default}" alt="${pokemon.name}">
            </main>
            <footer id="pokemonType" class="mini-pokemon-footer">
                ${icons}
            </footer>
        </div>
    `
}

function getFirstTypeTemplate(typeName, iconUrl) {
    return `
        <div class="type-icon d_flex_c_c bg_${typeName}">
            <img class="symbol-type" src="${iconUrl}" alt="${typeName}">
        </div>
    `;
}

function getSecondTypeTemplate(typeName, iconUrl) {
    return `
        <div class="type-icon d_flex_c_c bg_${typeName}">
            <img class="symbol-type" src="${iconUrl}" alt="${typeName}">
        </div>
    `;
}

function getPokemonDialogTemplate(index, iconsHTML) {
    const ability1 = pokemonList[index].abilities[0]?.ability?.name || "N/A";
    const ability2 = pokemonList[index].abilities[1]?.ability?.name || "";
    return `
        <header id="headerDialog" class="header-dialog d_flex_c_c" class="bg_${pokemonList[index].types[0].type.name}">
            <h2>
                ${pokemonList[index].name}
            </h2>
        </header>
        <main id="mainDialog" class="main-dialog">
            <div class="dialog-img d_flex_c_c">
                <img class="pokemon-detail-img " src="${pokemonList[index].sprites.other.home.front_default}" alt="${pokemonList[index].name}">
            </div>
            <section name="buttons" class="area-btn">
                
                    <button class="btn-pokemon-details bg_${pokemonList[index].types[0].type.name}" onclick="toggleFirstDetails()">
                        <b>main</b>
                    </button>
                    <button class="btn-pokemon-details bg_${pokemonList[index].types[0].type.name}" onclick="toggleSecondDetails()">
                        <b>stats</b>
                    </button>
                    <button class="btn-pokemon-details bg_${pokemonList[index].types[0].type.name}" onclick="toggleThirdDetails()">
                        <b>shiny</b>
                    </button>
                
            </section>
            <section name="PokemonDetails" class="d_flex_column">    
                <div id="pokemonFirstDetails" class="pokemon-first-details">
                    <table>
                        <tr>
                          <td>Weight</td>
                          <td>: ${pokemonList[index].weight} kg</td>
                        </tr>
                        <tr>
                          <td>Height</td>
                          <td>: ${pokemonList[index].height} dm</td>
                        </tr>
                        <tr>
                          <td>Base Experience</td>
                          <td>: ${pokemonList[index].base_experience}</td>
                        </tr>
                        <tr>
                          <td>Abilities:</td>
                          <td>: ${ability1}${ability2 ? ", " + ability2 : ""}</td>
                        </tr>                        
                    </table>
                </div>
                <div id="pokemonSecondDetails" class="pokemon-second-details d_none">
                    <table>
                        <tr>
                            <td>Healthpoints:</td>
                            <td id="skillBarHp" class="skill-bar">
                                <div class="skills hp" style="--value:${pokemonList[index].stats[0].base_stat};">
                                    ${pokemonList[index].stats[0].base_stat}
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>Attack:</td>
                            <td id="skillBarAtk" class="skill-bar">
                                <div class="skills atk" style="--value:${pokemonList[index].stats[1].base_stat};">
                                    ${pokemonList[index].stats[1].base_stat}
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>Defense:</td>
                            <td id="skillBarDef" class="skill-bar">
                                <div class="skills def" style="--value:${pokemonList[index].stats[2].base_stat};">
                                    ${pokemonList[index].stats[2].base_stat}
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>Specialattack:</td>
                            <td id="skillBarSAtk" class="skill-bar">
                                <div class="skills satk" style="--value:${pokemonList[index].stats[3].base_stat};">
                                    ${pokemonList[index].stats[3].base_stat}
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>Specialdefence:</td>
                            <td id="skillBarSDef" class="skill-bar">
                                <div class="skills sdef" style="--value:${pokemonList[index].stats[4].base_stat};">
                                    ${pokemonList[index].stats[4].base_stat}
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>Speed:</td>
                            <td id="skillBarSpd" class="skill-bar">
                                <div class="skills spd" style="--value:${pokemonList[index].stats[5].base_stat};">
                                    ${pokemonList[index].stats[5].base_stat}
                                </div>
                            </td>
                        </tr>
                    </table> 
                </div>                   
                <div id="pokemonThirdDetails" class="pokemon-third-details d_none">
                    <div class="d_flex_c_c">
                        <img class="pokemon-detail-shiny-img " src="${pokemonList[index].sprites.other.home.front_shiny}" alt="${pokemonList[index].name}">
                    </div>
                </div>
            </section>
        </main>
        <footer class="footer-dialog d_flex_se_c">
            <button class="btn-close-dialog" onclick="openDialog(${index - 1})">←</button>
            <button class="btn-close-dialog" onclick="closeDialog(${index})">X</button>
            <button class="btn-close-dialog" onclick="openDialog(${index + 1})">→</button>
        </footer>
    `
}

function getNoSearchTemplate(filterWord){
    return `
        <div class="no-search-results">
            no results for "${filterWord}" find.
        </div>
    `;
}