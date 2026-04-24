import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import useFetch from "../hooks/useFetch";
import { SearchResponse } from "../types";
import { RootState } from "../store/store";
import { setQuery, setResults, setFeatured, appendResults, incrementPage } from "../store/searchSlice";
import { Clock, Search as SearchIcon } from "lucide-react";
import SkeletonCard from "../components/SkeletonCard";
import MovieCard from "../components/MovieCard";
import { useNavigate } from "react-router-dom";

const apiKey = import.meta.env.VITE_API_KEY

const FEATURED_TERMS = ["marvel", "batman", "star wars", "harry potter", "james bond", "lord of the rings", "spiderman", "daredevil", "fast and furious", "chuck"]

// Stagger container — controls timing of child animations
const gridVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.07 } }
}

const Search = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [searchUrl, setSearchUrl] = useState("")
    const { data, isLoading, error } = useFetch<SearchResponse>(searchUrl)

    const { query, results, totalResults, featured, page } = useSelector((state: RootState) => state.search)
    const recentMovies = useSelector((state: RootState) => state.recent.movies)

    const [featuredUrl, setFeaturedUrl] = useState("")
    const { data: featuredData, isLoading: featuredLoading } = useFetch<SearchResponse>(featuredUrl)

    // Fetch featured on mount (only if not already stored)
    useEffect(() => {
        if (featured.length === 0) {
            const randomTerm = FEATURED_TERMS[Math.floor(Math.random() * FEATURED_TERMS.length)]
            setFeaturedUrl(`https://www.omdbapi.com/?s=${randomTerm}&apikey=${apiKey}`)
        }
    }, [])

    useEffect(() => {
        if (featuredData?.Response === "True") {
            dispatch(setFeatured(featuredData.Search))
        }
    }, [featuredData, dispatch])

    // Debounced search — fires 600ms after user stops typing
    useEffect(() => {
        if (!query.trim()) return
        const timer = setTimeout(() => {
            setSearchUrl(`https://www.omdbapi.com/?s=${encodeURIComponent(query)}&page=1&apikey=${apiKey}`)
        }, 600)
        return () => clearTimeout(timer)
    }, [query])

    useEffect(() => {
        if (data?.Response === "True") {
            if (page === 1) {
                dispatch(setResults({ results: data.Search, total: data.totalResults }))
            } else {
                dispatch(appendResults({ results: data.Search, total: data.totalResults }))
            }
        }
    }, [data, dispatch])

    const handleLoadMore = () => {
        const nextPage = page + 1
        dispatch(incrementPage())
        setSearchUrl(`https://www.omdbapi.com/?s=${encodeURIComponent(query)}&page=${nextPage}&apikey=${apiKey}`)
    }

    const hasMore = results.length < parseInt(totalResults)

    const renderSkeletons = () => (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-6 w-full">
            {Array.from({ length: 10 }).map((_, i) => (
                <SkeletonCard key={i} />
            ))}
        </div>
    )

    return (
        <div
            className="min-h-screen"
            style={{ backgroundColor: "var(--bg-primary)" }}
        >
            <div className="container mx-auto px-6 py-10">

                {/* Search bar */}
                <motion.div
                    initial={{ opacity: 0, y: -16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="flex items-center gap-3 w-full max-w-xl mx-auto"
                    style={{
                        backgroundColor: "var(--surface)",
                        border: "1px solid var(--input-border)",
                        borderRadius: "0.75rem",
                        padding: "0.65rem 1rem",
                        boxShadow: "var(--card-shadow)",
                    }}
                >
                    <SearchIcon size={18} style={{ color: "var(--text-muted)", flexShrink: 0 }} />
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => dispatch(setQuery(e.target.value))}
                        placeholder="Search a movie, series..."
                        style={{
                            backgroundColor: "transparent",
                            border: "none",
                            outline: "none",
                            color: "var(--text-primary)",
                            fontSize: "0.95rem",
                            width: "100%",
                        }}
                    />
                </motion.div>

                {/* Error messages */}
                {error && (
                    <p className="text-center mt-4 text-sm" style={{ color: "#E05A5A" }}>
                        Error: {error.message}
                    </p>
                )}
                {data?.Response === "False" && (
                    <p className="text-center mt-4 text-sm" style={{ color: "#E05A5A" }}>
                        {data.Error}
                    </p>
                )}

                {/* ── Home view (no query) ─────────────────────── */}
                <AnimatePresence mode="wait">
                    {!query && (
                        <motion.div
                            key="home"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            {/* Recently Viewed */}
                            {recentMovies.length > 0 && (
                                <div className="mt-10">
                                    <h2
                                        className="flex items-center gap-2 mb-4"
                                        style={{ color: "var(--text-primary)" }}
                                    >
                                        <Clock size={20} style={{ color: "var(--accent)" }} />
                                        Recently Viewed
                                    </h2>
                                    <div className="flex gap-3 overflow-x-auto pb-2">
                                        {recentMovies.map((movie, i) => (
                                            <motion.div
                                                key={movie.imdbID}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: i * 0.08, duration: 0.3 }}
                                                onClick={() => navigate(`/movies/${movie.imdbID}`)}
                                                className="flex-shrink-0 w-28 cursor-pointer"
                                                whileHover={{ scale: 1.05 }}
                                            >
                                                {movie.Poster !== "N/A" ? (
                                                    <img
                                                        src={movie.Poster}
                                                        alt={movie.Title}
                                                        className="w-28 object-cover rounded-lg"
                                                        style={{ height: "168px" }}
                                                    />
                                                ) : (
                                                    <div
                                                        className="w-28 rounded-lg flex items-center justify-center"
                                                        style={{ height: "168px", backgroundColor: "var(--bg-secondary)" }}
                                                    >
                                                        🎬
                                                    </div>
                                                )}
                                                <p
                                                    className="text-xs mt-1.5 truncate"
                                                    style={{ color: "var(--text-secondary)" }}
                                                >
                                                    {movie.Title}
                                                </p>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Featured */}
                            <div className="mt-10">
                                <h2 className="mb-4" style={{ color: "var(--text-primary)" }}>
                                    🎬 Featured
                                </h2>
                                {featuredLoading && renderSkeletons()}
                                {featured.length > 0 && (
                                    <motion.div
                                        variants={gridVariants}
                                        initial="hidden"
                                        animate="visible"
                                        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
                                    >
                                        {featured.map((movie) => (
                                            <MovieCard key={movie.imdbID} movie={movie} />
                                        ))}
                                    </motion.div>
                                )}
                            </div>
                        </motion.div>
                    )}

                    {/* ── Search results ───────────────────────── */}
                    {query && (
                        <motion.div
                            key="results"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="mt-8"
                        >
                            {isLoading && page === 1 && renderSkeletons()}

                            {results.length > 0 && (
                                <>
                                    <p className="mb-4 text-sm" style={{ color: "var(--text-muted)" }}>
                                        {totalResults} results for{" "}
                                        <span style={{ color: "var(--accent)" }}>"{query}"</span>
                                    </p>
                                    <motion.div
                                        variants={gridVariants}
                                        initial="hidden"
                                        animate="visible"
                                        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
                                    >
                                        {results.map((movie) => (
                                            <MovieCard key={movie.imdbID} movie={movie} />
                                        ))}
                                    </motion.div>

                                    {/* Load More */}
                                    {hasMore && (
                                        <div className="flex justify-center mt-10">
                                            <motion.button
                                                onClick={handleLoadMore}
                                                disabled={isLoading}
                                                whileHover={{ scale: 1.04 }}
                                                whileTap={{ scale: 0.96 }}
                                                className="px-8 py-2.5 rounded-lg text-sm font-semibold"
                                                style={{
                                                    backgroundColor: "transparent",
                                                    border: "1px solid var(--accent)",
                                                    color: "var(--accent)",
                                                    cursor: isLoading ? "not-allowed" : "pointer",
                                                    opacity: isLoading ? 0.5 : 1,
                                                    transition: "background-color 0.2s ease",
                                                }}
                                                onMouseEnter={e => {
                                                    e.currentTarget.style.backgroundColor = "var(--accent)"
                                                    e.currentTarget.style.color = "#fff"
                                                }}
                                                onMouseLeave={e => {
                                                    e.currentTarget.style.backgroundColor = "transparent"
                                                    e.currentTarget.style.color = "var(--accent)"
                                                }}
                                            >
                                                {isLoading ? "Loading..." : "Load More"}
                                            </motion.button>
                                        </div>
                                    )}

                                    {isLoading && page > 1 && renderSkeletons()}
                                </>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}

export default Search
