import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { format } from "date-fns";
import { Link } from 'react-router-dom';
import { FaStar } from "react-icons/fa";


const Table = () => {

  const [reviews, setReviews] = useState([])
  const [ratingFilter, setRatingFilter] = useState("");
  const [sortOrder, setSortOrder] = useState('');

  // get the reviews 
  const getReviews = async () => {
    const token = localStorage.getItem('token')
    try {
      const response = await axios.get('http://localhost:8000/api/get/reviews', {
        headers: {
          token: token
        },
        params: {
          rating: ratingFilter, // Pass rating filter
          sortOrder, // Pass sort order
        },
      })
      setReviews(response.data.response)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getReviews()
  }, [ratingFilter, sortOrder])



  // Delete Function
  const deleteReview = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.delete(`http://localhost:8000/api/delete/reviews/${id}`, {
        headers: {
          token: token
        }

      })
      getReviews()
    } catch (error) {
      console.log(error)
    }
  }



  return (
    <>

      <div>
        <h1 className='text-center mt-3'>Book Reviews</h1>
      </div>

      <div className=" col-11 mx-auto mt-5 p-4 shadow">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <Link to="/form">
            <button className="btn btn-success">Create Review</button>
          </Link>
        </div>
        <table className="table table-striped table-bordered  thead-dark">
          <thead className="thead-dark text-center">
            <tr>
              <th>No</th>
              <th>Title</th>
              <th>Author</th>
              <th>
                <select
                  value={ratingFilter}
                  onChange={(e) => setRatingFilter(e.target.value)}
                  className="form-select"
                >
                  <option value="">All Ratings</option>
                  <option value="4">Up to 4</option>
                  <option value="3">Up to 3</option>
                  <option value="2">Up to 2</option>
                  <option value="1">Up to 1</option>
                </select>
              </th>
              <th className='col-4'>Review</th>
              <th>
                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  className="form-select"
                >
                  <option value="">Created Date</option>
                  <option value="desc">Newest First</option>
                  <option value="asc">Oldest First</option>
                </select>
              </th>
              <th>About</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((review, index) => (
              <tr key={review._id}>
                <td>{index + 1}</td>
                <td>{review.title}</td>
                <td>{review.author}</td>
                <td className="text-start">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={i < review.rating ? 'text-warning' : 'text-secondary'}
                    />
                  ))}
                </td>
                <td>{review.review}</td>
                <td className='text-center'>{format(new Date(review.createdAt), "dd-MM-yyyy")}</td>
                <td><Link to={`/about/${review._id}`} className="btn btn-primary btn-sm">About</Link></td>
                <td><Link to={`/edit/${review._id}`} className="btn btn-warning btn-sm">Edit</Link></td>
                <td><button onClick={() => deleteReview(review._id)} className="btn btn-danger btn-sm">Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>



    </>
  )
}

export default Table