const BASE = "https://pokeapi.co/api/v2";

async function fetchJSON(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}


export async function getPokemonList(limit = 20, offset = 0) {
  const url = `${BASE}/pokemon?limit=${limit}&offset=${offset}`;
  return fetchJSON(url);
}


export async function getPokemonByNameOrUrl(nameOrUrl) {
  const url = nameOrUrl.startsWith("http")
    ? nameOrUrl
    : `${BASE}/pokemon/${nameOrUrl}`;
  return fetchJSON(url);
}


export async function searchPokemon(name) {
  try {
    return await getPokemonByNameOrUrl(name.toLowerCase());
  } catch {
    return null;
  }
}

export default { getPokemonList, getPokemonByNameOrUrl, searchPokemon };
