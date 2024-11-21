import axios from 'axios';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const Form = () => {

    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [rating, setRating] = useState("");
    const [review, setReviews] = useState("");
    const [message, setMessage] = useState('')

    const postReview = async (e) => {
        e.preventDefault()

        const token = localStorage.getItem('token')
        try {
            const response = await axios.post('http://localhost:8000/api/post/reviews',
                { title, author, rating, review },
                {
                    headers: {
                        token: token,
                    },
                }
            );
            setTitle('')
            setTitle("");
            setAuthor("");
            setRating("");
            setReviews("");
            setMessage("Review Created Successfully")
            setTimeout(() => {
                setMessage('')
            }, 3000);
        } catch (error) {
            console.log(error)
            setMessage("Enter  Valid Input")
            setTimeout(() => {
                setMessage('')
            }, 3000);
        }
    }


    return (
        <>

            <div className="container py-5">
                <div className="col-10 mx-auto  ">
                    <div className="mb-4 text-end">
                        <Link to="/table">
                            <button className="btn btn-primary">Go to Table</button>
                        </Link>
                    </div>
                    <div className="card shadow">
                        <div className="card-header bg-primary text-white">
                            <h4 className="mb-0">Submit a Review</h4>
                        </div>
                        <div className="card-body">
                            <form onSubmit={postReview} >
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">
                                        Title
                                    </label>
                                    <input
                                        type="text"
                                        id="title"
                                        className="form-control"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="author" className="form-label">
                                        Author
                                    </label>
                                    <input
                                        type="text"
                                        id="author"
                                        className="form-control"
                                        value={author}
                                        onChange={(e) => setAuthor(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="rating" className="form-label">
                                        Rating 1-5
                                    </label>
                                    <input
                                        type="number"
                                        id="rating"
                                        className="form-control"
                                        value={rating}
                                        onChange={(e) => setRating(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="reviews" className="form-label">
                                        Reviews
                                    </label>
                                    <textarea
                                        id="reviews"
                                        className="form-control"
                                        rows="4"
                                        value={review}
                                        onChange={(e) => setReviews(e.target.value)}
                                    />
                                </div>
                                <div className="text-end">
                                    <button type="submit" className="btn btn-success">
                                        Submit
                                    </button>
                                </div>
                                <div>
                                    {message && <p className={`text-center ${message==="Review Created Successfully"? "text-success":"text-danger"}`}>{message}</p>}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Form