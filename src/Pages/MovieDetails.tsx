import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { MovieDetails as MovieDetailsType } from "../types";
import { Star, Heart, ArrowLeft, Clock, Calendar, User, Users } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { addFavorite, removeFavorite } from "../store/favoriteSlice";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { addToRecent } from "../store/recentSlice";

const apiKey = import.meta.env.VITE_API_KEY

const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
}
const easeOut: [number, number, number, number] = [0.16, 1, 0.3, 1]
const item = {
    hidden: { opacity: 0, y: 14 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: easeOut } },
}

const MovieDetails = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const { data: movie, isLoading, error } = useFetch<MovieDetailsType>(
        `https://www.omdbapi.com/?i=${id}&apikey=${apiKey}`
    )

    const dispatch = useDispatch()
    const favorites = useSelector((state: RootState) => state.favorites.movies)
    const isFavorite = favorites.some((fav) => fav.imdbID === id)

    useEffect(() => {
        if (movie) {
            dispatch(addToRecent({
                imdbID: movie.imdbID,
                Title: movie.Title,
                Year: movie.Year,
                Poster: movie.Poster,
                Type: movie.Type
            }))
        }
    }, [movie, dispatch])

    const handleFavorite = () => {
        if (!movie) return
        if (isFavorite) {
            dispatch(removeFavorite(movie.imdbID))
            toast.error(`"${movie.Title}" removed from favorites`, { duration: 3000 })
        } else {
            dispatch(addFavorite({
                imdbID: movie.imdbID,
                Title: movie.Title,
                Year: movie.Year,
                Poster: movie.Poster,
                Type: movie.Type
            }))
            toast.success(`"${movie.Title}" added to favorites!`, { duration: 3000 })
        }
    }

    const stateClass = "min-h-[70vh] flex items-center justify-center text-zinc-400"


        if (isLoading || (!movie && !error)) return (
            <div className={stateClass}>
                <motion.div
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="font-serif text-lg"
                >
                    Loading...
                </motion.div>
            </div>
        )

        if (error) return (
            <div className={stateClass}>
                <p className="text-rose-400">Error: {error.message}</p>
            </div>
        )

        if (!movie) return (
            <div className={stateClass}>
                <p>Movie not found</p>
            </div>
        )

    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="visible"
            className="space-y-10 pt-10"
        >
            <motion.button
                variants={item}
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 hover:cursor-pointer text-sm font-medium text-zinc-400 hover:text-zinc-100 transition"
                whileHover={{ x: -3 }}
            >
                <ArrowLeft size={15} />
                Back
            </motion.button>

            <div className="flex flex-col md:flex-row gap-10">
                <motion.div
                    variants={item}
                    className="shrink-0 w-full md:w-64"
                    whileHover={{ y: -4 }}
                >
                    {movie.Poster !== "N/A" ? (
                        <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/60 p-2 shadow-[0_10px_30px_rgba(0,0,0,0.35)]">
                            <img
                                src={movie.Poster}
                                alt={movie.Title}
                                className="w-full rounded-xl"
                            />
                        </div>
                    ) : (
                        <div className="w-full aspect-2/3 rounded-2xl flex flex-col items-center justify-center gap-2 border border-zinc-800 bg-zinc-900 text-zinc-400">
                            <span className="text-5xl">🎬</span>
                            <span className="text-sm">No Poster</span>
                        </div>
                    )}
                </motion.div>

                <motion.div variants={item} className="flex flex-col gap-6 flex-1">
                    <div className="space-y-3">
                        <h1 className="font-serif text-3xl leading-tight text-zinc-100">
                            {movie.Title}
                        </h1>
                        <div className="flex flex-wrap gap-2">
                            {movie.Genre?.split(", ").map((g) => (
                                <span
                                    key={g}
                                    className="text-xs px-2.5 py-1 rounded-full border border-zinc-800 bg-zinc-900/70 text-zinc-300"
                                >
                                    {g}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-5">
                        <div className="flex items-center gap-1.5">
                            <Star size={14} className="text-amber-400" />
                            <span className="text-sm font-semibold text-zinc-100">
                                {movie.imdbRating}
                            </span>
                            <span className="text-xs text-zinc-400">/10</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-sm text-zinc-300">
                            <Calendar size={13} className="text-zinc-500" />
                            {movie.Year}
                        </div>
                        <div className="flex items-center gap-1.5 text-sm text-zinc-300">
                            <Clock size={13} className="text-zinc-500" />
                            {movie.Runtime}
                        </div>
                    </div>

                    <div className="h-px bg-zinc-800/80" />

                    <p className="text-sm leading-relaxed text-zinc-300">
                        {movie.Plot}
                    </p>

                    <div className="space-y-4">
                        <div className="flex items-start gap-3">
                            <User size={14} className="text-amber-400 mt-1 shrink-0" />
                            <div>
                                <span className="text-xs font-semibold uppercase tracking-widest text-zinc-500 block mb-1">
                                    Director
                                </span>
                                <p className="text-sm text-zinc-300">{movie.Director}</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <Users size={14} className="text-amber-400 mt-1 shrink-0" />
                            <div>
                                <span className="text-xs font-semibold uppercase tracking-widest text-zinc-500 block mb-1">
                                    Cast
                                </span>
                                <p className="text-sm text-zinc-300">{movie.Actors}</p>
                            </div>
                        </div>
                    </div>

                    <motion.button
                        onClick={handleFavorite}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold w-fit border transition
                            ${isFavorite
                                ? "bg-amber-400 text-zinc-950 border-amber-400"
                                : "border-amber-400 text-amber-400 hover:bg-amber-400 hover:text-zinc-950"
                            }
                        `}
                    >
                        <Heart
                            size={14}
                            fill={isFavorite ? "#0a0a0a" : "transparent"}
                            color={isFavorite ? "#0a0a0a" : "currentColor"}
                        />
                        {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
                    </motion.button>
                </motion.div>
            </div>
        </motion.div>
    )
}

export default MovieDetails