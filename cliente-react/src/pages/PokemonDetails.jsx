import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getPokemonByNameOrUrl } from "../api/pokeApi";
import "../index.css";

export default function PokemonDetails() {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getPokemonByNameOrUrl(id)
      .then((data) => setPokemon(data))
      .catch((err) => {
        console.error(err);
        setPokemon(null);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="center-muted">Carregando...</p>;
  if (!pokemon) return <p className="center-muted">Pokémon não encontrado.</p>;

  const img =
    pokemon.sprites?.other?.["official-artwork"]?.front_default ||
    pokemon.sprites?.front_default;

  return (
    <main className="detail-wrapper">


      <div className="detail-card">
            <img src={pokemon.sprites.front_default} className="detail-img" />

            <div className="detail-info">
                <h1 className="detail-title">{pokemon.name}</h1>

                <div className="detail-type">
                    Tipo: {pokemon.types.map(t => t.type.name).join(", ")}
                </div>

                <div className="detail-grid">
                    <div className="detail-item">
                        <strong>Peso</strong>
                        {pokemon.weight} kg
                    </div>

                    <div className="detail-item">
                        <strong>Altura</strong>
                        {pokemon.height} m
                    </div>

                    <div className="detail-item">
                        <strong>HP</strong>
                        {pokemon.stats[0].base_stat}
                    </div>

                    <div className="detail-item">
                        <strong>Ataque</strong>
                        {pokemon.stats[1].base_stat}
                    </div>
                </div>
            </div>
      </div>

      <div className="back-button">
        <Link to="/">← Voltar para a Pokédex</Link>
      </div>
    </main>
  );
}
