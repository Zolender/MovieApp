import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { RootState } from "../store/store";
import { logoutUser } from "../store/authSlice";
import { toggleTheme } from "../store/themeSlice";
import { Moon, Sun, Film, LogOut } from "lucide-react";

const NavBar = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()

    const currentUser = useSelector((state: RootState) => state.auth.currentUser)
    const theme = useSelector((state: RootState) => state.theme.theme)

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
            style={{
                backgroundColor: "var(--navbar-bg)",
                borderBottom: "1px solid var(--navbar-border)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
            }}
            className="fixed top-0 left-0 right-0 z-50"
        >
            <div className="container mx-auto flex items-center justify-between px-6 h-16">

                <div className="flex items-center gap-2.5">
                    <Film size={18} style={{ color: "var(--accent)" }} />
                    <span
                        style={{
                            fontFamily: "'Playfair Display', serif",
                            color: "var(--text-primary)",
                            fontWeight: 600,
                            fontSize: "1.05rem",
                            letterSpacing: "0.01em",
                        }}
                    >
                        CineSearch
                    </span>
                    {currentUser?.username && (
                        <span
                            className="hidden sm:block text-xs"
                            style={{
                                color: "var(--text-muted)",
                                borderLeft: "1px solid var(--input-border)",
                                paddingLeft: "0.625rem",
                                marginLeft: "0.25rem",
                            }}
                        >
                            {currentUser.username}
                        </span>
                    )}
                </div>

                <div className="flex items-center gap-1">
                    {[
                        { label: "Search", path: "/search" },
                        { label: "Favorites", path: "/favorites" },
                    ].map(({ label, path }) => (
                        <Link
                            key={path}
                            to={path}
                            className="relative px-3 py-1.5 rounded-md text-sm font-medium"
                            style={{
                                color: isActive(path) ? "var(--accent)" : "var(--text-secondary)",
                                transition: "color 0.2s ease",
                                textDecoration: "none",
                            }}
                        >
                            {label}
                            {isActive(path) && (
                                <motion.div
                                    layoutId="navbar-underline"
                                    className="absolute bottom-0 left-3 right-3 h-px"
                                    style={{ backgroundColor: "var(--accent)" }}
                                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                />
                            )}
                        </Link>
                    ))}

                    <div className="w-px h-4 mx-2" style={{ backgroundColor: "var(--input-border)" }} />

                    <motion.button
                        onClick={handleLogout}
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.96 }}
                        className="flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-md"
                        style={{
                            color: "var(--text-secondary)",
                            border: "1px solid var(--input-border)",
                            background: "none",
                            cursor: "pointer",
                        }}
                    >
                        <LogOut size={14} />
                        <span className="hidden sm:block">Logout</span>
                    </motion.button>

                    <motion.button
                        onClick={() => dispatch(toggleTheme())}
                        whileHover={{ scale: 1.12 }}
                        whileTap={{ scale: 0.9 }}
                        className="flex items-center justify-center w-8 h-8 rounded-md ml-1"
                        style={{ color: "var(--text-muted)", background: "none", border: "none", cursor: "pointer" }}
                        title="Toggle theme"
                    >
                        {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
                    </motion.button>
                </div>
            </div>
        </motion.nav>
    )
}

export default NavBar