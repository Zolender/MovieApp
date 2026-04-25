import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import useFetch from "../hooks/useFetch";
import { SearchResponse } from "../types";
import { RootState } from "../store/store";
import { setQuery, setResults, setFeatured, appendResults, incrementPage } from "../store/searchSlice";
import { Clock, FileVideoIcon, Search as SearchIcon } from "lucide-react";
import SkeletonCard from "../components/SkeletonCard";
import MovieCard from "../components/MovieCard";
import { useNavigate } from "react-router-dom";

const apiKey = import.meta.env.VITE_API_KEY

const FEATURED_TERMS = ["marvel", "batman", "star wars", "harry potter", "james bond", "lord of the rings", "spiderman", "daredevil", "fast and furious", "chuck"]

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
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 mt-6 w-full">
            {Array.from({ length: 10 }).map((_, i) => (
                <SkeletonCard key={i} />
            ))}
        </div>
    )

    return (
        <div className="space-y-15 pt-10">
            {/* Search bar */}
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="flex items-center gap-3 w-full max-w-2xl mx-auto rounded-xl border border-zinc-800 bg-zinc-900/70 px-4 py-3 shadow-sm"
            >
                <SearchIcon size={16} className="text-zinc-400" />
                <input
                    type="text"
                    value={query}
                    onChange={(e) => dispatch(setQuery(e.target.value))}
                    placeholder="Search a movie, series..."
                    className="w-full bg-transparent border-none outline-none text-sm text-zinc-100 placeholder-zinc-500"
                />
            </motion.div>

            {error && (
                <p className="text-center text-sm text-rose-400">
                    Error: {error.message}
                </p>
            )}
            {data?.Response === "False" && (
                <p className="text-center text-sm text-rose-400">
                    {data.Error}
                </p>
            )}

            <AnimatePresence mode="wait">
                {!query && (
                    <motion.div
                        key="home"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-10"
                    >
                        {recentMovies.length > 0 && (
                            <section className="space-y-4">
                                <div className="flex items-center gap-2 text-lg font-semibold text-zinc-200">
                                    <Clock size={16} className="text-amber-400" />
                                    Recently Viewed
                                </div>
                                <div className="flex gap-4 overflow-x-auto pb-2">
                                    {recentMovies.map((movie, i) => (
                                        <motion.div
                                            key={movie.imdbID}
                                            initial={{ opacity: 0, x: -16 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: i * 0.07, duration: 0.3 }}
                                            onClick={() => navigate(`/movies/${movie.imdbID}`)}
                                            className="shrink-0 cursor-pointer w-24"
                                            whileHover={{ y: -3, transition: { duration: 0.18 } }}
                                        >
                                            {movie.Poster !== "N/A" ? (
                                                <img
                                                    src={movie.Poster}
                                                    alt={movie.Title}
                                                    className="w-full h-36 object-cover rounded-lg"
                                                />
                                            ) : (
                                                <div className="w-full h-36 rounded-lg flex items-center justify-center bg-zinc-800">
                                                    🎬
                                                </div>
                                            )}
                                            <p className="text-xs mt-2 truncate text-zinc-400">
                                                {movie.Title}
                                            </p>
                                        </motion.div>
                                    ))}
                                </div>
                            </section>
                        )}

                        <section className="space-y-4">
                            <h2 className="text-lg font-semibold text-zinc-200 flex gap-2 items-center">
                                <FileVideoIcon size={16} className="text-amber-400" />
                                Featured</h2>
                            {featuredLoading && renderSkeletons()}
                            {featured.length > 0 && (
                                <motion.div
                                    variants={gridVariants}
                                    initial="hidden"
                                    animate="visible"
                                    className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5"
                                >
                                    {featured.map((movie) => (
                                        <MovieCard key={movie.imdbID} movie={movie} />
                                    ))}
                                </motion.div>
                            )}
                        </section>
                    </motion.div>
                )}

                {query && (
                    <motion.div
                        key="results"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-6"
                    >
                        {isLoading && page === 1 && renderSkeletons()}

                        {results.length > 0 && (
                            <>
                                <p className="text-sm text-zinc-400">
                                    {totalResults} results for{" "}
                                    <span className="text-amber-400">"{query}"</span>
                                </p>
                                <motion.div
                                    variants={gridVariants}
                                    initial="hidden"
                                    animate="visible"
                                    className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5"
                                >
                                    {results.map((movie) => (
                                        <MovieCard key={movie.imdbID} movie={movie} />
                                    ))}
                                </motion.div>

                                {hasMore && (
                                    <div className="flex justify-center pt-4">
                                        <motion.button
                                            onClick={handleLoadMore}
                                            disabled={isLoading}
                                            whileHover={{ scale: 1.04 }}
                                            whileTap={{ scale: 0.96 }}
                                            className="px-8 py-2.5 rounded-lg text-sm font-semibold border border-amber-400 text-amber-400 hover:bg-amber-400 hover:text-zinc-950 transition disabled:opacity-50"
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
    )
}

export default Search