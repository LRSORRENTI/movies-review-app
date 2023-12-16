import React, {useState, useEffect} from "react";
import MovieDataService from '../services/movies.js';
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const MoviesList = props => {
    const [movies, setMovies] = useState([]);
    const [searchTitle, setSearchTitle] = useState("");
    const [searchRatings, setSearchRatings] = useState("");
    const [ratings, setRatings] = useState(["All Ratings"]);


useEffect(() => {
    retrieveMovies()
    retrieveRatings()
}, [])


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

const retrieveRatings = () => {
    MovieDataService.getRatings()
        .then(res => {
            console.log(res.data)
            setRatings(["All Ratings"].concat(res.data))
        })
        .catch(error => {
            console.log(error)
        })
    };

const onChangeSearchTitle = (e) => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
};

const onChnageSearchRating = (e) => {
    const searchRating = e.target.value;
    setSearchRatings(searchRating)
};

return (
    <div className="App">
        <Container>
            
        </Container>
    </div>
)

};


export default MoviesList;