import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { RootState } from "../store/store";
import { logoutUser } from "../store/authSlice";

const NavBar = () => {

    const dispatch = useDispatch()
    const currentUser = useSelector((state: RootState)=> state.auth.currentUser)
    const navigate = useNavigate()

    function handleLogout(){
        dispatch(logoutUser())
        navigate("/login", {replace: true})

    }

    return (
        <nav className="fixed top-0 left-0 right-0 z-10 bg-white shadow-md">
            <div className="container mx-auto flex items-center justify-between p-4">
                
                <div className="flex items-center space-x-4">
                    <p className="text-xl font-bold">Welcome, <span className="">{currentUser?.username || "User"}</span></p>
                </div>
                <div className="flex items-center space-x-4">
                    <Link to={"/search"} className="text-blue-500 hover:underline">Search</Link>
                    <Link to={"/favorites"} className="text-blue-500 hover:underline">Favorites</Link>
                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={handleLogout}>Logout</button>
                </div>
            </div>
        </nav>
    );
}
 
export default NavBar;