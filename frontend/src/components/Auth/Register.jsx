import axios from 'axios';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';



const Register = () => {
    const navigate = useNavigate()
    const [message, setMessage] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    const registerFunction = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post('http://localhost:8000/api/register', {
                name, 
                email, 
                password
            });
            navigate('/');
        } catch (error) {
            console.log(error);
            setMessage("Registration failed. Please try again.");
            
            // Clear the message after 3 seconds
            setTimeout(() => {
                setMessage('');
            }, 3000);
        }
    }



    return (
        <>
            <div className="row mt-5 justify-content-center">
                <div className="col-md-5 col-lg-4 border border-primary border-2 p-4 rounded shadow">
                    <h3 className="text-center mb-4">Register</h3>
                    <form onSubmit={registerFunction}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input type="text" className="form-control" name="name" id="name" required onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input type="email" className="form-control" name="email" id="email" required onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" className="form-control" name="password" id="password" required onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <button type="submit" className="btn btn-primary w-100">Register</button>
                        </div>
                        <div className="text-center">
                            <p>Already a member? <Link to="/" className="text-primary">Login</Link></p>
                        </div>
                        <div>
                            {message && <p className='text-danger text-center'>{message}</p>}
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Register