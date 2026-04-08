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