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
            className="flex flex-col overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/60 shadow-sm cursor-pointer"
        >
            <div className="relative aspect-2/3 overflow-hidden">
                {movie.Poster !== "N/A" ? (
                    <img
                        src={movie.Poster}
                        alt={movie.Title}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center gap-2 bg-zinc-800">
                        <span className="text-3xl">🎬</span>
                        <span className="text-xs text-zinc-400">No Poster</span>
                    </div>
                )}
                <span className="absolute top-2 left-2 text-xs font-semibold px-2 py-0.5 rounded-full capitalize bg-zinc-950/70 text-amber-400">
                    {movie.Type}
                </span>
            </div>

            <div className="border-t border-zinc-800 p-3 space-y-1">
                <p
                    className="font-semibold text-sm leading-snug text-zinc-100 line-clamp-2"
                    title={movie.Title}
                >
                    {movie.Title}
                </p>
                <p className="text-xs text-zinc-400">{movie.Year}</p>
            </div>
        </motion.div>
    )
}

export default MovieCard