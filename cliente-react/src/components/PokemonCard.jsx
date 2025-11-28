export default function PokemonCard({ pokemon }) {
  const name = pokemon?.name || "—";

  // pegar imagem se tiver (se usa pokeApi com details)
  const img =
    pokemon?.sprites?.other?.["official-artwork"]?.front_default ||
    pokemon?.sprites?.front_default ||
    "";

  return (
    <div
      className="card shadow-sm text-center p-3 w-100"
      style={{ maxWidth: 200, borderRadius: 10 }}
    >
      {img && (
        <img
          src={img}
          alt={name}
          className="img-fluid mx-auto mb-2"
          style={{ width: 120, height: 120, objectFit: "contain" }}
        />
      )}

      <h6 className="mb-0 text-capitalize fw-semibold">{name}</h6>
      <small className="text-muted">#{pokemon?.id}</small>
    </div>
  );
}
