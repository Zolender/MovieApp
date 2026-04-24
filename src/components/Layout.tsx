import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

const Layout = () => {
    return (
        <>
            <NavBar />
            <main className="pt-20">
                <Outlet />
            </main>
        </>
    );
}

export default Layout;
