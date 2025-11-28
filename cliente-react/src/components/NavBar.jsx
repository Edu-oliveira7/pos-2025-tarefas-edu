import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <header className="nav-wrapper">
      <div className="nav-inner">
        <Link to="/" className="brand">Pokedex</Link>
      </div>
    </header>
  );
}
