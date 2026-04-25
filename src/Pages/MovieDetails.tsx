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

    const stateStyle: React.CSSProperties = {
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "var(--bg-primary)",
    }

    if (isLoading) return (
        <div style={stateStyle}>
            <motion.div
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                style={{ color: "var(--text-muted)", fontFamily: "'Playfair Display', serif", fontSize: "1.1rem" }}
            >
                Loading...
            </motion.div>
        </div>
    )

    if (error) return (
        <div style={stateStyle}>
            <p style={{ color: "#E05A5A" }}>Error: {error.message}</p>
        </div>
    )

    if (!movie) return (
        <div style={stateStyle}>
            <p style={{ color: "var(--text-muted)" }}>Movie not found</p>
        </div>
    )

    return (
        <div className="min-h-screen" style={{ backgroundColor: "var(--bg-primary)" }}>
            <div className="container mx-auto px-6 pt-28 pb-16 max-w-5xl">

                <motion.button
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-sm font-medium mb-10"
                    style={{
                        color: "var(--text-muted)",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        padding: 0,
                    }}
                    whileHover={{ x: -3 }}
                >
                    <ArrowLeft size={15} />
                    Back
                </motion.button>

                <div className="flex flex-col md:flex-row gap-10">

                    <motion.div
                        initial={{ opacity: 0, x: -24 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="shrink-0 w-full md:w-56"
                        style={{ alignSelf: "flex-start" }}
                    >
                        {movie.Poster !== "N/A" ? (
                            <img
                                src={movie.Poster}
                                alt={movie.Title}
                                className="w-full rounded-xl"
                                style={{ boxShadow: "var(--card-shadow-hover)" }}
                            />
                        ) : (
                            <div
                                className="w-full rounded-xl flex flex-col items-center justify-center gap-2"
                                style={{
                                    aspectRatio: "2/3",
                                    backgroundColor: "var(--bg-secondary)",
                                    color: "var(--text-muted)"
                                }}
                            >
                                <span className="text-5xl">🎬</span>
                                <span className="text-sm">No Poster</span>
                            </div>
                        )}
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 24 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
                        className="flex flex-col gap-6 flex-1"
                    >
                        <div>
                            <h1
                                style={{
                                    fontFamily: "'Playfair Display', serif",
                                    color: "var(--text-primary)",
                                    fontSize: "1.85rem",
                                    lineHeight: 1.2,
                                    marginBottom: "0.75rem",
                                }}
                            >
                                {movie.Title}
                            </h1>
                            <div className="flex flex-wrap gap-2">
                                {movie.Genre?.split(", ").map((g) => (
                                    <span
                                        key={g}
                                        className="text-xs px-2.5 py-1 rounded-full"
                                        style={{
                                            backgroundColor: "var(--bg-secondary)",
                                            color: "var(--text-secondary)",
                                            border: "1px solid var(--card-border)"
                                        }}
                                    >
                                        {g}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-5">
                            <div className="flex items-center gap-1.5">
                                <Star size={14} style={{ color: "var(--accent)" }} />
                                <span className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
                                    {movie.imdbRating}
                                </span>
                                <span className="text-xs" style={{ color: "var(--text-muted)" }}>/10</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <Calendar size={13} style={{ color: "var(--text-muted)" }} />
                                <span className="text-sm" style={{ color: "var(--text-secondary)" }}>{movie.Year}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <Clock size={13} style={{ color: "var(--text-muted)" }} />
                                <span className="text-sm" style={{ color: "var(--text-secondary)" }}>{movie.Runtime}</span>
                            </div>
                        </div>

                        <div style={{ height: "1px", backgroundColor: "var(--card-border)" }} />

                        <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                            {movie.Plot}
                        </p>

                        <div className="flex flex-col gap-4">
                            <div className="flex items-start gap-3">
                                <User size={14} style={{ color: "var(--accent)", marginTop: "3px", flexShrink: 0 }} />
                                <div>
                                    <span
                                        className="text-xs font-semibold uppercase tracking-widest block mb-0.5"
                                        style={{ color: "var(--text-muted)" }}
                                    >
                                        Director
                                    </span>
                                    <p className="text-sm" style={{ color: "var(--text-secondary)" }}>{movie.Director}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <Users size={14} style={{ color: "var(--accent)", marginTop: "3px", flexShrink: 0 }} />
                                <div>
                                    <span
                                        className="text-xs font-semibold uppercase tracking-widest block mb-0.5"
                                        style={{ color: "var(--text-muted)" }}
                                    >
                                        Cast
                                    </span>
                                    <p className="text-sm" style={{ color: "var(--text-secondary)" }}>{movie.Actors}</p>
                                </div>
                            </div>
                        </div>

                        <motion.button
                            onClick={handleFavorite}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold w-fit"
                            style={{
                                backgroundColor: isFavorite ? "var(--accent)" : "transparent",
                                border: "1px solid var(--accent)",
                                color: isFavorite ? "#fff" : "var(--accent)",
                                cursor: "pointer",
                                transition: "all 0.2s ease",
                            }}
                        >
                            <Heart
                                size={14}
                                fill={isFavorite ? "#fff" : "transparent"}
                                color={isFavorite ? "#fff" : "var(--accent)"}
                            />
                            {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
                        </motion.button>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}

export default MovieDetails