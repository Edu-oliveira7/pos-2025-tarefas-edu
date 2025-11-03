import { loadPokemons, setupSearch } from './pokemonDom.js';

// Inicializar a aplicação
document.addEventListener('DOMContentLoaded', () => {
    loadPokemons();
    setupSearch();
});