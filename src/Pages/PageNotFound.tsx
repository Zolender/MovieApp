import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Film } from "lucide-react";

const PageNotFound = () => {
    const navigate = useNavigate()

    return (
        <div
            className="min-h-screen flex flex-col items-center justify-center gap-5 text-center px-6"
            style={{ backgroundColor: "var(--bg-primary)" }}
        >
            <motion.div
                animate={{ rotate: [0, -12, 12, -8, 8, 0] }}
                transition={{ duration: 0.8, delay: 0.3, ease: "easeInOut" }}
            >
                <Film size={44} style={{ color: "var(--accent)" }} />
            </motion.div>

            <motion.h1
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "5rem",
                    fontWeight: 700,
                    color: "var(--accent)",
                    lineHeight: 1,
                }}
            >
                404
            </motion.h1>

            <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.12 }}
                className="flex flex-col gap-2"
            >
                <h2 style={{ color: "var(--text-primary)", fontSize: "1.2rem" }}>
                    This scene doesn't exist
                </h2>
                <p className="text-sm max-w-xs" style={{ color: "var(--text-muted)" }}>
                    The page you're looking for must have been cut from the final edit.
                </p>
            </motion.div>

            <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.28 }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => navigate("/search")}
                className="px-6 py-2.5 rounded-lg text-sm font-semibold"
                style={{
                    backgroundColor: "var(--accent)",
                    color: "#fff",
                    border: "none",
                    cursor: "pointer",
                }}
            >
                Back to Home
            </motion.button>
        </div>
    )
}

export default PageNotFound