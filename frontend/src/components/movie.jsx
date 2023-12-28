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
        <div>
            <Container>
                <Row>
                    <Col>
                    <Image src={movie.poster+"/100pxx250"} fluid />
                    </Col>
                    <Col>
                    <Card>
                        <Card.Header as="h5">{movie.title}</Card.Header>
                        <Card.Body>
                            <Card.Text>
                                {movie.plot}
                            </Card.Text>
                            {props.user &&
                            <Link to={"/movies/" + props.match.params.id + "/review"}>
                                Add Review
                            </Link> }
                        </Card.Body>
                    </Card>
                    <br></br>
                    {movie.reviews.map((review, index) => {
                        return (
                            // <Media key={index}>
                            //     <Media.Body>
                            //         <h5>{review.name + " reviewed on "}{momemt(review.date).format("Do MMMM YYYY")}</h5>
                            //         <p>{review.review}</p>
                            //         {props.user && props.user.id === review.user_id && 
                            //             <Row>
                            //                 <Col>
                            //                     <Link to={{
                            //                         pathname:"/movies/" + 
                            //                                  props.match.params.id + 
                            //                                  "/review",
                            //                         state: {currentReview: review}
                            //                     }}>Edit</Link>
                            //                 </Col>
                            //                 <Col><Button variant="link">Delete</Button></Col>
                            //             </Row>
                            //         }
                            //     </Media.Body>
                            // </Media>
                            <Card key={index}>
                            <Card.Body>
                                <h5>{review.name + " reviewed on "}{momemt(review.date).format("Do MMMM YYYY")}</h5>
                                <p>{review.review}</p>
                                {props.user && props.user.id === review.user_id && 
                                    <Row>
                                        <Col>
                                            <Link to={{
                                                pathname:"/movies/" + 
                                                         props.match.params.id + 
                                                         "/review",
                                                state: {currentReview: review}
                                            }}>Edit</Link>
                                        </Col>
                                        <Col>
                                        <Button variant="link" onClick={() => deleteReview(review._id, index)}>
                                            Delete</Button>
                                        </Col>
                                    </Row>
                                }
                            </Card.Body>
                        </Card>
                        )
                    })}
                    </Col>
                </Row>
            </Container>
        </div>
    );
};