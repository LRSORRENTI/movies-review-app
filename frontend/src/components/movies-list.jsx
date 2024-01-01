import React, {useState, useEffect} from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from "react-bootstrap/Col";
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';

import MovieDataService from '../services/movies.js';
import { Link } from "react-router-dom/cjs/react-router-dom.min";

import '../movie-list.css'

const MoviesList = props => {
    const [movies, setMovies] = useState([]);
    const [searchTitle, setSearchTitle] = useState("");
    const [searchRating, setSearchRatings] = useState("");
    const [ratings, setRatings] = useState(["Pick Rating","G", "PG", "PG-13", "R"]);

    const [currentPage, setCurrentPage] = useState(0);
    const [entriesPerPage, setEntriesPerPage] = useState(0);
    // above we have two state vars, to keep track of 
    // the current displayed page and number of entries 

    const [currentSearchMode, setCurrentSearchMode] = useState("")


    const retrieveNextPage = () => {
        if(currentSearchMode === 'findByTitle')
        findByTitle()
        else if(currentSearchMode === 'findByRating')
        findByRating()
        else retrieveMovies()
    }

        useEffect(() => {
        setCurrentPage(0)
        }, [currentSearchMode])

        useEffect(() => {
        // retrieveMovies()
         retrieveNextPage()
        }, [currentPage])



        // useEffect(() => {
        // retrieveMovies()
        // retrieveRatings()
        // }, [currentPage])


const retrieveMovies = () => {
    setCurrentSearchMode("")
    MovieDataService.getAll()
    .then(res => {
        console.log(res.data)
        setMovies(res.data.movies)
        setCurrentPage(res.data.page)
        setEntriesPerPage(res.data.entries_per_page)
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

const filterDuplicates = (movies) => {
    const seen = new Set();
    return movies.filter(movie => {
        if (!seen.has(movie._id)) {
            seen.add(movie._id);
            return true;
        }
        return false;
    });
};


const onChangeSearchTitle = (e) => {
    setSearchTitle(e.target.value);
};

const onChangeSearchRating = (e) => {
    const searchRating = e.target.value;
    setSearchRatings(searchRating)
};

const find = (query, by) => {
    MovieDataService.find(query, by, currentPage)
        .then(res => {
            console.log(res.data)
            setMovies(res.data.movies)
        })
        .catch( error => {
            console.log(error)
        })
};

const findByTitle = () => {
    setCurrentSearchMode("findByTitle");
    
    let searchQuery = searchTitle.trim();
    if (searchQuery) {
        searchQuery = `"${searchQuery}"`;
    }

    find(searchQuery, "title");
};

const findByRating = () => {
    setCurrentSearchMode("findByRating")
    if(searchRating === "All Ratings") {
        retrieveMovies()
    }
    else {
        find(searchRating, "rated")
    }
}

function isValidHttpUrl(string) {
    let url;

    try {
        url = new URL(string);
    } catch (_) {
        return false;  
    }

    return url.protocol === "http:" || url.protocol === "https:";
}


const getRatingText = (rating) => {
    if (!rating || rating === "PASSED" || rating === "APPROVED") {
        return "(Rating Unknown)";
    }
    return rating;
};



return (
    <div className="App">
        <Container>
            <div className="wrapper1">
            <Form className="search">
                <Row className="row1">
                    <Col className="topCol">
                        <Form.Group>
                            <Form.Control 
                              type="text"
                              className="form-search"
                              placeholder="Search by title"
                              value={searchTitle}
                              onChange={onChangeSearchTitle}
                              />
                        </Form.Group>
                        <Button className="searchBtn"
                        
                         type="button"
                         onClick={findByTitle}>
                            Search title
                         </Button>
                    </Col>
                    <Col>
                     <Form.Group>
                        <Form.Control
                        className="ratingForm"
                        as="select"
                        onChange={onChangeSearchRating}>
                        {ratings.map(rating => {
                            return (
                                <option className="option" value={rating}>{rating}</option>
                            )
                        })}
                        </Form.Control>
                     </Form.Group>
                     <Button 
                             type="button"
                             className="searchBtn"
                             onClick={findByRating}>
                                Search rating
                             </Button>

                    </Col>
                </Row>
            </Form>
            </div>
            <Row className="movie-row">
                {(() => {
                    const titleTracker = {};
                    return movies.map((movie) => {
                        if (!titleTracker[movie.title]) {
                            titleTracker[movie.title] = true;
                            return (
                                <Col key={movie._id}>
                            <Card className="card-bg">
                            {/* <Card.Img src={movie.poster ? movie.poster + "/100px180" : "/images/posterNotFound.png"} /> */}
                            <Card.Img className="card-img"
                                 src={movie.poster && isValidHttpUrl(movie.poster) ? movie.poster + "/100px180" : "/images/posterNotFound.png"}
                                 onError={(e) => { e.target.onerror = null; e.target.src = "/images/posterNotFound.png"; }}
                                    />

                                <Card.Body>
                                    <Card.Title>{movie.title}</Card.Title>
                                    <Card.Text>
                                    Rating: {getRatingText(movie.rated)}
                                    </Card.Text>
                                    <Card.Text>{movie.plot}</Card.Text>
                                    <Link className="hover-effect" to={"/movies/"+movie._id}>View Reviews</Link>
                                </Card.Body>
                            </Card>
                        </Col>
                            )
                         }
                       return null
                     })
                })()}
            </Row>
            <br/>
            <p style={{color: "#FFFF"}}>Showing page: {currentPage}</p>
            <Button style={{color: "#d1a41a", textDecoration: "none"}} variant="link" onClick={() => {setCurrentPage(currentPage + 1)}}>
                Get next {entriesPerPage} results
            </Button>
        </Container>
    </div>
)

};


export default MoviesList;