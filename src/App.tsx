import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import Login from "./Pages/Login"
import ProtectedRoute from "./components/ProtectedRoute"
import Search from "./Pages/Search"
import MovieDetails from "./Pages/MovieDetails"
import Favorites from "./Pages/Favorites"
import PageNotFound from "./Pages/PageNotFound"
import PublicRoute from "./components/PublicRoute"
import { Toaster } from "react-hot-toast"
import ErrorBoundary from "./components/errorBoundary"
import { useSelector } from "react-redux"
import { RootState } from "./store/store"
function App() {
  const theme = useSelector((state: RootState)=> state.theme.theme)

  return (
    <div data-theme={theme} style={{minHeight : "100vh"}}>
      <BrowserRouter>
        <Toaster position="bottom-right"/>

        <ErrorBoundary>
          <Routes>
            <Route element = {<PublicRoute/>}>
              <Route path="/login" element={<Login/>}/>
            </Route>

            
            <Route element={<ProtectedRoute/>}>
              <Route path="/" element={<Navigate to="/search" replace/>}/>
              <Route path="/search" element={<Search/>}/>
              <Route path="/movies/:id" element={<MovieDetails/>}/>
              <Route path="/favorites" element={<Favorites/>}/>
            </Route>

            <Route path="*" element={<PageNotFound/>}/>
          </Routes>
        </ErrorBoundary>
      </BrowserRouter>
    </div>
  )
}

export default App
