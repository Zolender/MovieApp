import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../store/store";
import { removeFavorite } from "../store/favoriteSlice";
import toast from "react-hot-toast";
import MovieCard from "../components/MovieCard";
import { Heart } from "lucide-react";

const gridVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.07 } }
}

const Favorites = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const favorites = useSelector((state: RootState) => state.favorites.movies)

    const handleRemove = (imdbID: string, title: string) => {
        dispatch(removeFavorite(imdbID))
        toast.error(`"${title}" removed from favorites`, { duration: 3000 })
    }

    return (
        <div className="space-y-10 pt-10">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="flex items-center gap-3"
            >
                <Heart size={22} className="text-amber-400" />
                <h1 className="text-xl font-semibold text-zinc-100">My Favorites</h1>
                {favorites.length > 0 && (
                    <span className="text-xs px-2 py-0.5 rounded-full border border-zinc-800 bg-zinc-900 text-zinc-300">
                        {favorites.length}
                    </span>
                )}
            </motion.div>

            {/* Empty state */}
            <AnimatePresence>
                {favorites.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="flex flex-col items-center justify-center gap-4 mt-16 text-center"
                    >
                        <span className="text-6xl">🎞️</span>
                        <h2 className="text-lg font-semibold text-zinc-100">No favorites yet</h2>
                        <p className="text-sm max-w-xs text-zinc-400">
                            Movies you add to your favorites will appear here
                        </p>
                        <motion.button
                            whileHover={{ scale: 1.04 }}
                            whileTap={{ scale: 0.96 }}
                            onClick={() => navigate("/search")}
                            className="mt-2 px-6 py-2.5 rounded-lg text-sm font-semibold bg-amber-400 text-zinc-950"
                        >
                            Browse Movies
                        </motion.button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Grid */}
            {favorites.length > 0 && (
                <motion.div
                    variants={gridVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5"
                >
                    <AnimatePresence>
                        {favorites.map((movie) => (
                            <motion.div
                                key={movie.imdbID}
                                layout
                                exit={{ opacity: 0, scale: 0.85 }}
                                transition={{ duration: 0.25 }}
                                className="relative group"
                            >
                                <MovieCard movie={movie} />

                                {/* Remove button */}
                                <button
                                    className="absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center bg-black/60 text-white opacity-100 md:opacity-0 md:group-hover:opacity-100 transition"
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        handleRemove(movie.imdbID, movie.Title)
                                    }}
                                    title="Remove from favorites"
                                >
                                    <Heart size={14} fill="#E05A5A" color="#E05A5A" />
                                </button>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            )}
        </div>
    )
}

export default Favorites