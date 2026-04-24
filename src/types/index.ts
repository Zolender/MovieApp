import { ReactNode } from "react"
export type User = {
    username: string
    password: string
}

export type MovieSearchResult = {
    imdbID: string
    Title: string
    Year: string
    Poster: string
    Type: string
}

export type MovieDetails = {
    imdbID: string
    Title: string
    Year: string
    Poster: string
    Type: string
    Plot: string
    Director: string
    Actors: string
    Genre: string
    Runtime: string
    imdbRating: string
}

export type SearchResponse = {
    Search: MovieSearchResult[]
    totalResults: string
    Response: string
    Error?:string//for when the response may be a falsy value
}

export type Props = {
    children: ReactNode
}

export type State ={
    hasError: boolean
    message: string
}

export type SearchState = {
    query: string
    results: MovieSearchResult[]
    totalResults: string
    featured: MovieSearchResult[]
    page: number
}

export type RecentState = {
    movies: MovieSearchResult[]
}

export type Theme = "light" | "dark"

export type ThemeState = {
    theme: Theme
}

export type FavoriteState= {
    movies: MovieSearchResult[]
}

