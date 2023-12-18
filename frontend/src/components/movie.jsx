import React, { useEffect, useState } from "react";
import MovieDataService from '../services/movies.js';
import Link from 'react-router-dom';

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
        MovieDataService.get(id).then(res => {
            setMovie(res.data)
            console.log(res.data)
        }).catch(err => {
            console.log(err)
        })
    }

    useEffect(() => {
        getMovie(props.match.params.id)
    }, [props.match.params.id])

    return(
        <div>
        </div>
    );
};