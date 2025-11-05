import './App.css'
import { BrowserRouter, Link, Route, Routes } from "react-router-dom"


function App() {
  return (
    <>
    <BrowserRouter>
      <nav>
        <Link to="/">Accueil</Link> |{" "}
        <Link to="/favorites">Favoris</Link>
      </nav>
      <Routes>
        <Route path="/" element={<h1>Page d'Accueil</h1>} />
        <Route path="/favorites" element={<h1>Page des Favoris</h1>} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
