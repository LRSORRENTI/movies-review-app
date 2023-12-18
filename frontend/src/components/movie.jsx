import React, { useEffect, useState } from "react";
import MovieDataService from '../services/movies.js';
import Link from 'react-router-dom';

export default function Movie(props) {
    
    const [movie, setMovie] = useState({
        id: null,
        title: "",
        rated: "",
        reviews: []
    })

    return(
        <div className="App">
            Movie
        </div>
    );
};