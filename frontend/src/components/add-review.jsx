import React, { useState } from "react";
import MovieDataService from '../services/movies';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'

 const AddReview = props => {
    let editing = false;
    let intialReviewState = "";

    const [review, setReview] = useState(intialReviewState);
    const [submitted, setSubmitted] = useState(false);

    const onChangeReview = evt => {
        const review = evt.target.value;
        setReview(review);
    }

    return (
        <div className="App">
            Add Review
        </div>
    );
};

export default AddReview;