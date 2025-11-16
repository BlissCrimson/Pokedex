function getAllPokemonTemplate(index) {
    return `
        <div onclick="openDialog(${index})" class="mini-pokemon">
            <header class="mini-pokemon-header">
                <h2>#${pokemonList[index].id}</h2>
                <h2>
                    ${pokemonList[index].name}
                </h2>
            </header>
            <main class="mini-pokemon-main bg_${pokemonList[index].types[0].type.name}">
                <img class="mini-pokemon-img" src="${pokemonList[index].sprites.other.home.front_default}" alt="${pokemonList[index].name}">
            </main>
            <footer id="pokemonType" class="mini-pokemon-footer">
                
                <img class="symbol-type bg_${pokemonList[index].types[0].type.name}" src="" alt="">
            </footer>
        </div>
    `
}

function getPokemonDialogTemplate(index) {
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
            <section name="PokemonDetails class="d_flex_column">    
                <div id="pokemonFirstDetails" class="pokemon-first-details ">
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
                          <td>: ${pokemonList[index].abilities[0].ability.name}, ${typeTwo(index)}</td>
                        </tr>
                    </table>
                </div>
                <div id="pokemonSecondDetails" class="pokemon-second-details d_none">
                    <table>
                        <tr>
                            <td>Healthpoints:</td>
                            <td id="skillBarHp" class="skill-bar">
                                <div class="skills hp">
                                    ${pokemonList[index].stats[0].base_stat}
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>Attack:</td>
                            <td id="skillBarAtk" class="skill-bar">
                                <div class="skills atk">
                                    ${pokemonList[index].stats[1].base_stat}
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>Defense:</td>
                            <td id="skillBarDef" class="skill-bar">
                                <div class="skills def">
                                    ${pokemonList[index].stats[2].base_stat}
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>Specialattack:</td>
                            <td id="skillBarSAtk" class="skill-bar">
                                <div class="skills satk">
                                    ${pokemonList[index].stats[3].base_stat}
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>Specialdefence:</td>
                            <td id="skillBarSDef" class="skill-bar">
                                <div class="skills sdef">
                                    ${pokemonList[index].stats[4].base_stat}
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>Speed:</td>
                            <td id="skillBarSpd" class="skill-bar">
                                <div class="skills spd">
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
        <footer class="footer-dialog d_flex_c_c">
            <!-- <button class="btn-close-dialog" onclick="openDialog(${index - 1})">←</button>  -->
            <button class="btn-close-dialog" onclick="closeDialog(${index})">X</button>
            <!-- <button class="btn-close-dialog" onclick="openDialog(${index + 1})">→</button>  -->
        </footer>
    `
}