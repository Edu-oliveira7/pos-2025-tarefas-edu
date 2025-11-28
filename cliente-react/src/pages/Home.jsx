import { useEffect, useState } from "react";
import { getPokemonList, getPokemonByNameOrUrl } from "../api/pokeApi";
import PokemonCard from "../components/PokemonCard";
import { Link } from "react-router-dom";
import "../index.css";

export default function Home() {
  const [pokemons, setPokemons] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const limit = 20;

  useEffect(() => {
    loadPage(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  async function loadPage(p) {
    setLoading(true);
    try {
      const data = await getPokemonList(limit, p * limit);
      // buscar detalhes para cada item (para ter imagem e id)
      const details = await Promise.all(
        data.results.map((item) => getPokemonByNameOrUrl(item.url))
      );
      setPokemons(details);
    } catch (err) {
      console.error(err);
      setPokemons([]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="home-wrapper">
      <h1 className="title">Pokédex</h1>

      {loading ? (
        <p className="center-muted">Carregando...</p>
      ) : (
        <section className="grid">
          {pokemons.map((p) => (
            <Link key={p.id} to={`/pokemon/${p.id}`} className="card-link">
              <PokemonCard pokemon={p} />
            </Link>
          ))}
        </section>
      )}

      <div className="pagination">
        <button
          className="btn"
          onClick={() => setPage((s) => Math.max(0, s - 1))}
          disabled={page === 0 || loading}
        >
          ◀ Anterior
        </button>

        <span className="page-number">Página {page + 1}</span>

        <button className="btn" onClick={() => setPage((s) => s + 1)} disabled={loading}>
          Próxima ▶
        </button>
      </div>
    </main>
  );
}
