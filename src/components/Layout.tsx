import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

const Layout = () => {
    return (
        <div className="flex flex-col gap-20">
            <NavBar />
            <main className="container mx-auto px-6 sm:px-8 lg:px-12 py-10">
                <Outlet />
            </main>
        </div>
    );
}

export default Layout;
