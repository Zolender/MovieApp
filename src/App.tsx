import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import Login from "./Pages/Login"
import ProtectedRoute from "./components/ProtectedRoute"
import Search from "./Pages/Search"
import MovieDetails from "./Pages/MovieDetails"
import Favorites from "./Pages/Favorites"
import PageNotFound from "./Pages/PageNotFound"
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route element={<ProtectedRoute/>}>
          <Route path="/" element={<Navigate to="/search" replace/>}/>
          <Route path="/search" element={<Search/>}/>
          <Route path="/movies/:id" element={<MovieDetails/>}/>
          <Route path="/favorites" element={<Favorites/>}/>
        </Route>

        <Route path="*" element={<PageNotFound/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
