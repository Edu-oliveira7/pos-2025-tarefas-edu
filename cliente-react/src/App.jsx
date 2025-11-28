import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import PokemonDetails from "./pages/PokemonDetails";
import "./index.css";

export default function App() {
  return (
    <div className="app-root">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pokemon/:id" element={<PokemonDetails />} />
      </Routes>
    </div>
  );
}
