import './App.css'
import { BrowserRouter, Link, Route, Routes } from "react-router-dom"
import { Home } from './pages/Home'
import { FavoritesPage } from './pages/Favorites'
import { FavoritesProvider } from './contexts/FavoritesContext'


function AppContent() {
  return (
    <>
    <BrowserRouter>
      <nav className="bg-gray-800 text-white shadow p-4">
        <div className="container mx-auto flex items-center justify-between">
          <Link to="/" className="text-xl font-bold hover:text-gray-300">Accueil</Link>
          <div className="space-x-4">
            <Link to="/favorites" className="px-3 py-1 rounded hover:text-gray-300 transition">Favoris</Link>
          </div>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favorites" element={<FavoritesPage />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

function App() {
  return (
    <>
      <FavoritesProvider>
        <AppContent />
      </FavoritesProvider>
    </>
  )
}

export default App
