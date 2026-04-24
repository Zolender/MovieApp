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
            <div className="container mx-auto flex items-center justify-between px-6 py-4">

                {/* Left — Logo + username */}
                <div className="flex items-center gap-3">
                    <Film
                        size={22}
                        style={{ color: "var(--accent)" }}
                    />
                    <span
                        className="text-lg"
                        style={{
                            fontFamily: "'Playfair Display', serif",
                            color: "var(--text-primary)",
                            fontWeight: 600,
                            letterSpacing: "0.01em"
                        }}
                    >
                        CineSearch
                    </span>
                    <span
                        className="text-sm hidden sm:block"
                        style={{ color: "var(--text-muted)" }}
                    >
                        — {currentUser?.username}
                    </span>
                </div>

                {/* Right — Nav links + actions */}
                <div className="flex items-center gap-6">

                    {/* Links */}
                    <div className="flex items-center gap-5">
                        {[
                            { label: "Search", path: "/search" },
                            { label: "Favorites", path: "/favorites" },
                        ].map(({ label, path }) => (
                            <Link
                                key={path}
                                to={path}
                                className="relative text-sm font-medium transition-colors duration-200"
                                style={{
                                    color: isActive(path)
                                        ? "var(--accent)"
                                        : "var(--text-secondary)",
                                }}
                            >
                                {label}
                                {/* Animated underline for active link */}
                                {isActive(path) && (
                                    <motion.div
                                        layoutId="navbar-underline"
                                        className="absolute -bottom-1 left-0 right-0 h-px"
                                        style={{ backgroundColor: "var(--accent)" }}
                                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                    />
                                )}
                            </Link>
                        ))}
                    </div>

                    {/* Divider */}
                    <div
                        className="h-4 w-px"
                        style={{ backgroundColor: "var(--card-border)" }}
                    />

                    {/* Theme toggle */}
                    <motion.button
                        onClick={() => dispatch(toggleTheme())}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="flex items-center justify-center"
                        style={{ color: "var(--text-secondary)", background: "none", border: "none", cursor: "pointer" }}
                        title="Toggle theme"
                    >
                        {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
                    </motion.button>

                    {/* Logout */}
                    <motion.button
                        onClick={handleLogout}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 text-sm font-medium px-3 py-1.5 rounded-lg"
                        style={{
                            color: "var(--text-secondary)",
                            border: "1px solid var(--card-border)",
                            background: "none",
                            cursor: "pointer",
                            transition: "color 0.2s ease, border-color 0.2s ease"
                        }}
                    >
                        <LogOut size={15} />
                        <span className="hidden sm:block">Logout</span>
                    </motion.button>

                </div>
            </div>
        </motion.nav>
    )
}

export default NavBar
