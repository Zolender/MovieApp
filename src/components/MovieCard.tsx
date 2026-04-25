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
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
            }}
            transition={{ duration: 0.32, ease: "easeOut" }}
            whileHover={{ y: -4, transition: { duration: 0.18 } }}
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
            <div className="relative overflow-hidden" style={{ aspectRatio: "2/3" }}>
                {movie.Poster !== "N/A" ? (
                    <img
                        src={movie.Poster}
                        alt={movie.Title}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div
                        className="w-full h-full flex flex-col items-center justify-center gap-2"
                        style={{ backgroundColor: "var(--bg-secondary)" }}
                    >
                        <span className="text-3xl">🎬</span>
                        <span className="text-xs" style={{ color: "var(--text-muted)" }}>No Poster</span>
                    </div>
                )}
                <span
                    className="absolute top-2 left-2 text-xs font-semibold px-2 py-0.5 rounded-full capitalize"
                    style={{
                        backgroundColor: "rgba(0,0,0,0.55)",
                        color: "var(--accent)",
                        backdropFilter: "blur(4px)",
                    }}
                >
                    {movie.Type}
                </span>
            </div>
 
            <div className="p-3 flex flex-col gap-1">
                <p
                    className="font-semibold text-sm leading-snug"
                    style={{
                        color: "var(--text-primary)",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                    }}
                    title={movie.Title}
                >
                    {movie.Title}
                </p>
                <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                    {movie.Year}
                </p>
            </div>
        </motion.div>
    )
}
 
export default MovieCard