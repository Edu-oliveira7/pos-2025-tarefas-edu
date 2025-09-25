const pokeList = document.getElementById("pokemon-list");

const processedChains = new Set();

let allCards = []; // guardar os cards carregados



// Paleta de cores para tipos

const typeColors = {
    grass: "bg-green-100 border-green-400",
    fire: "bg-red-100 border-red-400",
    water: "bg-blue-100 border-blue-400",
    electric: "bg-yellow-100 border-yellow-400",
    bug: "bg-lime-100 border-lime-400",
    normal: "bg-gray-100 border-gray-400",
    poison: "bg-purple-100 border-purple-400",
    ground: "bg-amber-100 border-amber-400",
    fairy: "bg-pink-100 border-pink-400",
    fighting: "bg-orange-100 border-orange-400",
    psychic: "bg-pink-200 border-pink-500",
    rock: "bg-stone-200 border-stone-400",
    ghost: "bg-indigo-200 border-indigo-500",
    ice: "bg-cyan-100 border-cyan-400",
    dragon: "bg-indigo-300 border-indigo-600",
    dark: "bg-zinc-300 border-zinc-600",
    steel: "bg-slate-200 border-slate-400",

};



// Tradução português -> inglês

const tipoTraducao = {
    "agua": "water",
    "fogo": "fire",
    "grama": "grass",
    "elétrico": "electric",
    "eletrico": "electric",
    "inseto": "bug",
    "normal": "normal",
    "veneno": "poison",
    "terra": "ground",
    "fada": "fairy",
    "lutador": "fighting",
    "psíquico": "psychic",
    "psiquico": "psychic",
    "pedra": "rock",
    "fantasma": "ghost",
    "gelo": "ice",
    "dragão": "dragon",
    "dragao": "dragon",
    "sombrio": "dark",
    "aço": "steel",
    "aco": "steel"

};



// -------- Função para ajustar layout --------

function ajustarLayout() {
    const cards = pokeList.querySelectorAll(".pokemon-card");
    if (cards.length === 1) {
        pokeList.className = "flex justify-center w-full max-w-6xl";
    } else {
        pokeList.className = "grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-6xl";
    }

}



// -------- Carregar Pokémons --------

async function loadPokemons() {
    const pokemonByType = [
        'bulbasaur', 'charmander', 'squirtle', 'pikachu',
        'caterpie', 'pidgey', 'ekans', 'sandshrew',
        'clefairy', 'mankey', 'abra', 'geodude',
        'gastly', 'lapras', 'dratini', 'poochyena',
        'magnemite', 'klink',
    ];


    for (const pokemonName of pokemonByType) {
        const speciesRes = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonName}`);
        if (!speciesRes.ok) continue;
        const speciesData = await speciesRes.json();


        const evoRes = await fetch(speciesData.evolution_chain.url);
        const evoData = await evoRes.json();


        if (!processedChains.has(evoData.chain.species.name)) {
            processedChains.add(evoData.chain.species.name);
            const cardData = await createEvolutionCard(evoData.chain);
            allCards.push(cardData);
            pokeList.appendChild(cardData.element);
        }
    }


    ajustarLayout();

}



// -------- Criar Card de Evolução --------

async function createEvolutionCard(chain) {
    let evoChain = [];
    let current = chain;
    while (current) {
        evoChain.push(current.species.name);
        current = current.evolves_to[0];
    }


    const firstPokemonRes = await fetch(`https://pokeapi.co/api/v2/pokemon/${evoChain[0]}`);
    const firstPokemon = await firstPokemonRes.json();
    const mainType = firstPokemon.types[0].type.name;
    const colorClass = typeColors[mainType] || "bg-white border-gray-300";


    const card = document.createElement("div");
    card.className = `pokemon-card rounded-xl p-6 shadow-lg border-2 hover:shadow-2xl transition ${colorClass}`;
    card.dataset.type = mainType;


    const title = document.createElement("h2");
    title.className = "text-2xl font-bold mb-6 capitalize text-center";
    title.innerText = `${evoChain[0]} - Linha Evolutiva`;
    card.appendChild(title);


    const evoRow = document.createElement("div");
    evoRow.className = "flex items-center justify-center gap-4 mb-6";


    for (let i = 0; i < evoChain.length; i++) {
        const pokeRes = await fetch(`https://pokeapi.co/api/v2/pokemon/${evoChain[i]}`);
        const pokemon = await pokeRes.json();


        const img = document.createElement("img");
        img.src = pokemon.sprites.front_default;
        img.alt = pokemon.name;
        img.className = "w-20 h-20";


        evoRow.appendChild(img);


        if (i < evoChain.length - 1) {
            const arrow = document.createElement("span");
            arrow.innerText = "→";
            arrow.className = "text-xl font-bold";
            evoRow.appendChild(arrow);
        }
    }


    card.appendChild(evoRow);


    for (let name of evoChain) {
        const pokeRes = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        const pokemon = await pokeRes.json();


        const section = document.createElement("div");
        section.className = "border-t border-gray-300 pt-4 mt-4";


        const pokeName = document.createElement("h3");
        pokeName.className = "text-xl font-semibold capitalize text-center mb-2";
        pokeName.innerText = pokemon.name;


        const img = document.createElement("img");
        img.src = pokemon.sprites.front_default;
        img.className = "mx-auto mb-2 w-24 h-24";


        const abilities = document.createElement("div");
        abilities.innerHTML = `<h4 class="font-semibold">Poderes:</h4>`;
        const ulAbilities = document.createElement("ul");
        ulAbilities.className = "list-disc list-inside text-sm";
        pokemon.abilities.forEach(a => {
            const li = document.createElement("li");
            li.innerText = a.ability.name;
            ulAbilities.appendChild(li);
        });
        abilities.appendChild(ulAbilities);


        const statsContainer = document.createElement("div");
        statsContainer.innerHTML = `<h4 class="font-semibold mt-2">Estatísticas:</h4>`;
        pokemon.stats.forEach(s => {
            const wrapper = document.createElement("div");
            const label = document.createElement("div");
            label.className = "flex justify-between text-sm font-semibold";
            label.innerHTML = `<span>${s.stat.name.toUpperCase()}</span><span>${s.base_stat}</span>`;

            const bar = document.createElement("div");
            bar.className = "w-full bg-gray-200 rounded-full h-3";
            const fill = document.createElement("div");
            fill.className = "bg-blue-500 h-3 rounded-full";
            fill.style.width = `${Math.min(s.base_stat, 100)}%`;


            bar.appendChild(fill);
            wrapper.appendChild(label);
            wrapper.appendChild(bar);
            statsContainer.appendChild(wrapper);
        });


        section.appendChild(pokeName);
        section.appendChild(img);
        section.appendChild(abilities);
        section.appendChild(statsContainer);


        card.appendChild(section);
    }


    return { element: card, type: mainType };

}



// -------- Pesquisa --------

function filtrarPorBusca() {
    const input = document.getElementById("search-input").value.trim().toLowerCase();
    const tipo = tipoTraducao[input] || input; // converte para inglês se necessário


    pokeList.innerHTML = "";


    allCards.forEach(cardData => {
        if (tipo === "" || cardData.type.includes(tipo)) {
            pokeList.appendChild(cardData.element);
        }
    });


    ajustarLayout();

}



document.getElementById("search-btn").addEventListener("click", filtrarPorBusca);

document.getElementById("search-input").addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        filtrarPorBusca();
    }

});



loadPokemons();