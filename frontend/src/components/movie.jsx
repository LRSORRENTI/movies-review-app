import React, { useEffect, useState } from "react";
import MovieDataService from '../services/movies.js';
import Link from 'react-router-dom/Link.js';
import momemt from 'moment';

import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Image from 'react-bootstrap/Image'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
// import Media from 'react-bootstrap/Media'
import '../viewReview.css'

export default function Movie(props) {
    
    // first define the movie state var to house 
    // the specific movie we currently show in the 
    // Movie component, and useState to update the value,
    // intial state is null, empty strings, empty []
    const [movie, setMovie] = useState({
        id: null,
        title: "",
        rated: "",
        reviews: []
    })

    function isValidHttpUrl(string) {
        let url;
    
        try {
            url = new URL(string);
        } catch (_) {
            return false;  
        }
    
        return url.protocol === "http:" || url.protocol === "https:";
    }
    

    const deleteReview = (reviewId, index) => {
        // this function will call the MovieDataService
        // delete endpoint on the reviews controller on 
        // the backend
        MovieDataService.deleteReview(reviewId, props.user.id)
        .then(res => {
            setMovie((prevState) => {
                prevState.reviews.splice(index, 1)
                // then we return the reviews array below 
                return ({
                    ...prevState
                })
            })
        }).catch(err => {
            console.log(err)
        })

    }

    const getMovie = id => {
        // the method calls get of the MovieDataService//
        // which is what callsthe API route on the backend

        MovieDataService.get(id).then(res => {
            setMovie(res.data)
            console.log(res.data)
        }).catch(err => {
            console.log(err)
        })
    }
    // then useEffect calls getMovie every time the 
    // value for props.match.params.id changes
    useEffect(() => {
        getMovie(props.match.params.id)
    }, [props.match.params.id])
    
    return(
        <div className="large-wrap">
        <div className="review-wrap">
            <div className="card-wrapper">
              <Card className="card-bg">
                            {/* <Card.Img src={movie.poster ? movie.poster + "/100px180" : "/images/posterNotFound.png"} /> */}
                            <Card.Img className="card-img"
                                 src={movie.poster && isValidHttpUrl(movie.poster) ? movie.poster + "/100px180" : "/images/posterNotFound.png"}
                                 onError={(e) => { e.target.onerror = null; e.target.src = "/images/posterNotFound.png"; }}
                                    />

                                <Card.Body>
                                    <Card.Title>{movie.title}</Card.Title>
                                    <Card.Text>
                                    </Card.Text>
                                    <Card.Text>{movie.plot}</Card.Text>
                                </Card.Body>
                                {props.user &&
                            <Link className="add-rev" to={"/movies/" + props.match.params.id + "/review"}>
                                Add Review
                            </Link> }
                            </Card>
                            </div>
            <Container className="review-cont">
                    
                    <br></br>
                    {movie.reviews.map((review, index) => {
                        return (
                            <div className="rev-wrap">
                            <Card key={index}>
                            <div className="rev-body-wrap">
                            <Card.Body className="rev-body">
                                <h5 className="card-h5">{review.name + ": "}{momemt(review.date).format("( MMMM Do, YYYY )")}</h5>
                                <p>{review.review}</p>
                                {props.user && props.user.id === review.user_id && 
                                    <Row>
                                        <Col>
                                            <Link className="edit-del" to={{
                                                pathname:"/movies/" + 
                                                         props.match.params.id + 
                                                         "/review",
                                                state: {currentReview: review}
                                            }}>Edit</Link>
                                        </Col>
                                        <Col>
                                        <Button className="edit-del" variant="link" onClick={() => deleteReview(review._id, index)}>
                                            Delete</Button>
                                        </Col>
                                    </Row>
                                }
                            </Card.Body>
                            </div>
                        </Card>
                        </div>
                        )
                    })}
            </Container>
        </div>
        </div>
    );
};