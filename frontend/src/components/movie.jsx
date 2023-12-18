import React, { useEffect, useState } from "react";
import MovieDataService from '../services/movies.js';
import Link from 'react-router-dom';


import {Card, Container, Image, Col, Row, Button, Media} from 'react-bootstrap' 

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
                    <h2>Reviews</h2>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};