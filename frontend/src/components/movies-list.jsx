import React, {useState, useEffect} from "react";
import MovieDataService from '../services/movies.js';
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const MoviesList = (props) => {
    const [movies, setMovies] = useState([]);
    const [searchTitle, setSearchTitle] = useState("");
    const [searchRatings, setSearchRatings] = useState("");
    const [ratings, setRatings] = useState(["All Ratings"]);

    useEffect(() => {
        MovieDataService.getAll()
        .then(res => {
            console.log(res.data)
            setMovies(res.data.movies)
        })
        .catch( error => {
            console.log(error)
        })
    })
}

const retrieveMovies = () => {
    MovieDataService.getAll()
    .then(res => {
        console.log(res.data)
        setMovies(res.data.movies)
    })
    .catch(error => {
        console.log(error)
    })
}

export default function MoviesList() {
    return (
        <div className="App">
            Movies List
        </div>
    );
};