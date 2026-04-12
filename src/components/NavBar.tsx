import { useDispatch, useSelector } from "react-redux";
import { Link, replace, useNavigate } from "react-router-dom";
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
        <nav className="">
            <div className="">
                <Link to={"/search"}>Search</Link>
                <Link to={"/favorites"}>Favorites</Link>
            </div>
            <p className="">Hello! Welcome, <span className="">{currentUser?.username || "User"}</span></p>
            <button className="" onClick={handleLogout}>Logout</button>
        </nav>
    );
}
 
export default NavBar;