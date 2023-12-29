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
    const [ratings, setRatings] = useState(["All Ratings"]);

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

// const retrieveRatings = () => {
//     MovieDataService.getRatings()
//         .then(res => {
//             console.log(res.data)
//             setRatings(["All Ratings"].concat(res.data))
//         })
//         .catch(error => {
//             console.log(error)
//         })
//     };

const onChangeSearchTitle = (e) => {
    setSearchTitle(e.target.value);
};

const onChnageSearchRating = (e) => {
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

{/* <Card.Img 
    src={movie.poster && isValidHttpUrl(movie.poster) ? movie.poster + "/100px180" : "/images/posterNotFound.png"}
    onError={(e) => { e.target.onerror = null; e.target.src = "/images/posterNotFound.png"; }}
/> */}


return (
    <div className="App">
        <Container>
            <Form className="search">
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
                        <Button className="searchBtn"
                        
                         type="button"
                         onClick={findByTitle}>
                            Search by title
                         </Button>
                    </Col>
                    <Col>
                     <Form.Group>
                        <Form.Control
                        as="select"
                        onChange={onChnageSearchRating}>
                        {ratings.map(rating => {
                            return (
                                <option value={rating}>{rating}</option>
                            )
                        })}
                        </Form.Control>
                     </Form.Group>
                     <Button 
                             type="button"
                             className="searchBtn"
                             onClick={findByRating}>
                                Search by rating
                             </Button>

                    </Col>
                </Row>
            </Form>
            <Row>
                {movies.map((movie) => {
                    return (
                        <Col>
                            <Card style={{width: '18rem', marginBottom: "20px"}}>
                            {/* <Card.Img src={movie.poster ? movie.poster + "/100px180" : "/images/posterNotFound.png"} /> */}
                            <Card.Img 
    src={movie.poster && isValidHttpUrl(movie.poster) ? movie.poster + "/100px180" : "/images/posterNotFound.png"}
    onError={(e) => { e.target.onerror = null; e.target.src = "/images/posterNotFound.png"; }}
/>

                                <Card.Body>
                                    <Card.Title>{movie.title}</Card.Title>
                                    <Card.Text>
                                        Rating: {movie.rated}
                                    </Card.Text>
                                    <Card.Text>{movie.plot}</Card.Text>
                                    <Link className="hover-effect" to={"/movies/"+movie._id}>View Reviews</Link>
                                </Card.Body>
                            </Card>
                        </Col>
                    )
                })}
            </Row>
            <br/>
            <p style={{color: "#FFFF"}}>Showing page: {currentPage}</p>
            <Button style={{color: "#FF1867"}} variant="link" onClick={() => {setCurrentPage(currentPage + 1)}}>
                Get next {entriesPerPage} results
            </Button>
        </Container>
    </div>
)

};


export default MoviesList;