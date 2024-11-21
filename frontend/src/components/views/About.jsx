import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { FaStar } from "react-icons/fa";

const About = () => {


    const { id } = useParams()
    const [getReview, setGetReview] = useState({})

    const getByID = async () => {

        const token = localStorage.getItem('token')
        try {
            const response = await axios.get(`http://localhost:8000/api/get/reviews/${id}`, {
                headers: {
                    token: token
                }
            })
            setGetReview(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getByID()
    }, [])


    return (
        <>

            <div className="col-8 mx-auto my-5">
                <div>
                    <h1 className='text-center mb-3'>ABOUT</h1>
                </div>
                <div className="card shadow-lg p-4">
                    <div>
                        <Link to={'/table'}>  <button className='btn btn-primary btn-sm'> &larr; Go to Table</button></Link>
                    </div>
                    <div className="card-body text-center">
                        <h2 className="card-title mb-3">{getReview?.title}</h2>
                        <p className="card-subtitle text-muted mb-3">Author: {getReview?.author}</p>
                        <div className=" m2-3">
                            <p className="badge bg-primary">
                                Rating:
                                {[...Array(5)].map((_, i) => (
                                    <FaStar
                                        key={i}
                                        className={i < getReview?.rating ? 'text-warning ms-1' : 'text-white ms-1'}
                                    />
                                ))}
                            </p>
                        </div>
                        <div className="mb-3">
                            <h5 className="mb-2">Review:</h5>
                            <p>{getReview?.review}</p>
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}

export default About