
export const typeColors = {
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
export const tipoTraducao = {
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

// Funções de API
export async function fetchPokemonSpecies(pokemonName) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonName}`);
    if (!response.ok) throw new Error(`Erro ao buscar espécie: ${pokemonName}`);
    return await response.json();
}

export async function fetchEvolutionChain(url) {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Erro ao buscar cadeia evolutiva');
    return await response.json();
}

export async function fetchPokemonData(pokemonName) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    if (!response.ok) throw new Error(`Erro ao buscar Pokémon: ${pokemonName}`);
    return await response.json();
}

export async function getEvolutionChainNames(chain) {
    let evoChain = [];
    let current = chain;
    while (current) {
        evoChain.push(current.species.name);
        current = current.evolves_to[0];
    }
    return evoChain;
}