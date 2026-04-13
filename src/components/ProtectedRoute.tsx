import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Navigate } from "react-router-dom";
import Layout from "./Layout";

const ProtectedRoute = () => {
    const currentUser = useSelector((state: RootState)=> state.auth.currentUser)

    if(currentUser){
        return <Navigate to="/login" replace/>
    }
    return (
        <Layout/>
    );
}
 
export default ProtectedRoute;