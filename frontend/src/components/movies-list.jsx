import React, {useState, useEffect} from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from "react-bootstrap/Col";
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';


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
            <Form>
                <Row>
                    <Col>
                        <Form.Group>
                            <Form.Control 
                              type="text"
                              placeholder="Search by title"
                              value={searchTitle}
                              onChange={onChangeSearchTitle}
                              />
                        </Form.Group>
                    </Col>
                </Row>
            </Form>
        </Container>
    </div>
)

};


export default MoviesList;