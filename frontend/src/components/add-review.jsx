import React, {useState} from 'react';
import MovieDataService from '../services/movies.js';
import { Link, useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import '../add-review.css'

const AddReview = (props) => {

  const { id } = useParams()

  let editing = false;
  let initialReviewState = "";

  if (props.location && props.location.currentReview) {
    editing = true;
    initialReviewState = props.location.currentReview.review;
  }

  const [review, setReview] = useState(initialReviewState);
  const [submitted, setSubmitted] = useState(false);

  const onChangeReview = (e) => {
    const review = e.target.value
    setReview(review)
  }

  const saveReview = () => {
    var data = {
      review: review,
      name: props.user.name,
      user_id: props.user.id,
      movie_id: id
    }

    if (editing) {
      data.review = props.location.state.currentReview._id
      MovieDataService.updateReview(data)
      .then(response => {
        setSubmitted(true);
        console.log(response.data)
      })
      .catch(error => {
        console.log(error)
      })
    } else {
          MovieDataService.createReview(data)
            .then(response => {
              setSubmitted(true)
            })
            .catch(error => {
              console.log(error)
            })
    }
  }

  return (
    <div className='main-cont'>
        {submitted ? (
        <div>
          <h4 className='submitted'>Review submitted successfully</h4>
          <Link className="ret-link" to={`/movies/${id}`}>
            Back to movie
          </Link>
        </div>
        ) : (
          <div className="form-container">
          <Form className='add-rev-form'>
            <Form.Group className='form-group'>
              <div className="form-label-wrap">
              <Form.Label className='form-label'>{editing? "Edit" : "Create Review"}</Form.Label>
              </div>
            {/* <div className="form-field-wrap"> */}
              {/* <Form.Control
                className='form-field'
                type="text"
                required
                value={review}
                onChange={onChangeReview}
              /> */}
              {/* </div> */}
              <div className="form-field-wrap">
              <textarea
              className='form-field'
              type="text"
              placeholder='Add review text'
              required
              value={review}
              onChange={onChangeReview}
              name="Add review" 
              cols="30" 
              rows="10">
              </textarea>
              </div>

            </Form.Group>
            <Button className='submitReview' variant='primary' onClick={saveReview}>
              Submit
            </Button>
          </Form>
          </div>
        )}
    </div>
  )
}

export default AddReview