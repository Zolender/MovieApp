import { motion } from "framer-motion";
import { MovieSearchResult } from "../types";
import { useNavigate } from "react-router-dom";

type Props = {
    movie: MovieSearchResult
}

const MovieCard = ({ movie }: Props) => {
    const navigate = useNavigate()

    return (
        <motion.div
            onClick={() => navigate(`/movies/${movie.imdbID}`)}
            variants={{
                hidden: { opacity: 0, y: 24 },
                visible: { opacity: 1, y: 0 }
            }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
            style={{
                backgroundColor: "var(--card-bg)",
                border: "1px solid var(--card-border)",
                boxShadow: "var(--card-shadow)",
                borderRadius: "0.75rem",
                overflow: "hidden",
                cursor: "pointer",
            }}
            className="flex flex-col"
        >
            {/* Poster */}
            <div className="relative overflow-hidden" style={{ height: "260px" }}>
                {movie.Poster !== "N/A" ? (
                    <img
                        src={movie.Poster}
                        alt={movie.Title}
                        className="w-full h-full object-cover"
                        style={{ transition: "transform 0.4s ease" }}
                    />
                ) : (
                    <div
                        className="w-full h-full flex flex-col items-center justify-center gap-2"
                        style={{ backgroundColor: "var(--bg-secondary)" }}
                    >
                        <span className="text-4xl">🎬</span>
                        <span className="text-sm" style={{ color: "var(--text-muted)" }}>
                            No Poster
                        </span>
                    </div>
                )}

                {/* Subtle dark overlay at bottom for text readability if needed */}
                <div
                    className="absolute bottom-0 left-0 right-0 h-12"
                    style={{
                        background: "linear-gradient(to top, rgba(0,0,0,0.3), transparent)"
                    }}
                />
            </div>

            {/* Info */}
            <div className="p-3 flex flex-col gap-1">
                <h3
                    className="font-semibold truncate text-sm"
                    style={{ color: "var(--text-primary)" }}
                    title={movie.Title}
                >
                    {movie.Title}
                </h3>
                <div className="flex items-center gap-2">
                    <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                        {movie.Year}
                    </span>
                    <span style={{ color: "var(--card-border)" }}>•</span>
                    <span
                        className="text-xs capitalize"
                        style={{ color: "var(--accent)" }}
                    >
                        {movie.Type}
                    </span>
                </div>
            </div>
        </motion.div>
    )
}

export default MovieCard
