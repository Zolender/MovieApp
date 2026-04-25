import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { RootState } from "../store/store";
import { logoutUser } from "../store/authSlice";
import { Film, LogOut } from "lucide-react";

const NavBar = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()

    const currentUser = useSelector((state: RootState) => state.auth.currentUser)

    const handleLogout = () => {
        dispatch(logoutUser())
        navigate("/login", { replace: true })
    }

    const isActive = (path: string) => location.pathname === path

    return (
        <motion.nav
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="fixed top-0 left-0 right-0 z-50 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur"
        >
            <div className="container mx-auto flex items-center justify-between px-6 sm:px-8 lg:px-12 h-16">
                <div className="flex items-center gap-2.5">
                    <Film size={18} className="text-amber-400" />
                    <span className="font-serif text-lg font-semibold tracking-tight text-zinc-100">
                        CineSearch
                    </span>
                    {currentUser?.username && (
                        <span className="hidden sm:block text-xs text-zinc-400 border-l border-zinc-700 pl-2.5 ml-1">
                            {currentUser.username}
                        </span>
                    )}
                </div>

                <div className="flex items-center gap-2">
                    {[
                        { label: "Search", path: "/search" },
                        { label: "Favorites", path: "/favorites" },
                    ].map(({ label, path }) => (
                        <Link
                            key={path}
                            to={path}
                            className={`relative px-3 py-1.5 rounded-md text-sm font-medium transition ${
                                isActive(path) ? "text-amber-400" : "text-zinc-300 hover:text-zinc-100"
                            }`}
                        >
                            {label}
                            {isActive(path) && (
                                <motion.div
                                    layoutId="navbar-underline"
                                    className="absolute bottom-0 left-3 right-3 h-px bg-amber-400"
                                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                />
                            )}
                        </Link>
                    ))}

                    <motion.button
                        onClick={handleLogout}
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.96 }}
                        className="flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-md border border-zinc-700 text-zinc-300 hover:text-zinc-100 hover:border-zinc-500 transition"
                    >
                        <LogOut size={14} />
                        <span className="hidden sm:block">Logout</span>
                    </motion.button>
                </div>
            </div>
        </motion.nav>
    )
}

export default NavBar