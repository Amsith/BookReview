import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';

const Edit = () => {

    const { id } = useParams()
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [rating, setRating] = useState("");
    const [review, setReviews] = useState("");
    const [message, setMessage] = useState('')
    const navigate = useNavigate()


    useEffect(() => {
        const fetchReview = async () => {
            const token = localStorage.getItem('token'); // Ensure you are fetching the token
            try {
                const response = await axios.get(`http://localhost:8000/api/get/reviews/${id}`, {
                    headers: {
                        token: token,
                    }
                });
                setTitle(response.data.title)
                setAuthor(response.data.author)
                setRating(response.data.rating)
                setReviews(response.data.review)
            } catch (error) {
                console.error(error); 
            }
        };

        fetchReview(); 
    }, [id]);



    const postReview = async (e) => {
        e.preventDefault()

        const token = localStorage.getItem('token')
        try {
            const response = await axios.put(`http://localhost:8000/api/put/reviews/${id}`,
                { title, author, rating, review },
                {
                    headers: {
                        token: token,
                    },
                }
            );

            setMessage("Review Updated Successfully")

            setTimeout(() => {
                navigate('/table')
            }, 2000);
        } catch (error) {
            console.log(error)
            setMessage("Error in Updating")
            setTimeout(() => {
                setMessage('')
            }, 1000);
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
                            <h4 className="mb-0">Edit a Review</h4>
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
                                        Update
                                    </button>
                                </div>
                                <div>
                                    {message && <p className={`text-center ${message === "Review Updated Successfully" ? "text-primary" : "text-danger"}`}>{message}</p>}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Edit