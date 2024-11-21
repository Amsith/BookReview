import axios from 'axios';
import React, { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom';




const Login = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')

    const LoginFunction = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post('http://localhost:8000/api/login', {
                email, password
            })

            const token = response.data.token
            localStorage.setItem("token", token)

            //st the token in the headers
            navigate('/table')

        } catch (error) {
            console.log(error)
            setMessage('Invalid Credential')
        }
    }


    return (
        <>
        <div className='text-center mt-5'>
            <h2>BOOK REVIEW</h2>
        </div>
            <div className="row mt-5 justify-content-center">
                <div className="col-md-5 col-lg-4 border border-primary border-2 p-4 rounded shadow">
                    <h3 className="text-center mb-4">Login</h3>
                    <form onSubmit={LoginFunction}>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input type="email" className="form-control" name="email" id="email" required onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" className="form-control" name="password" id="password" required onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <button type="submit" className="btn btn-primary w-100">Login</button>
                        </div>
                        <div className="text-center">
                            <p>Not a member? <Link to="/register" className="text-primary">Register</Link></p>
                        </div>
                    </form>
                    <div>
                        {message && <p className='text-center text-danger'>{message}</p>}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login