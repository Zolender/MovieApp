import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Outlet, Navigate } from "react-router-dom";

function PublicRoute(){
    const currentUser = useSelector((state: RootState)=>state.auth.currentUser)

    if(currentUser){
        return <Navigate to="/search" replace />
    }

    return <Outlet />
}

export default PublicRoute;