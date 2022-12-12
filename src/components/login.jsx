import React, { useState } from 'react'
import "../style/login.css"
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"

const url = import.meta.env.VITE_SERVER_URL

const Login = () => {
    const navigate = useNavigate();
    const [details, setDetails] = useState({
        email: "",
        password: ""
    })

    const loginCredentials = (e) => {
        const { name, value } = e.target
        setDetails({
            ...details,
            [name]: value
        })
    }

    const logged = async (e) => {
        e.preventDefault()

        try {
            const res = await axios.post(`${url}/login`, details)
            alert('You are successfully login')
            const token = res.data.data
            localStorage.setItem('token', token)
            navigate('/bookList')

        } catch (err) {
            let error = err.response.data.message
            alert(error)
        }
    }

    return (
        <div className='login'>

                <h3>Please First Login With Your Account Credentials</h3>
                <div className='data'>
                    <h4>Email</h4>
                    <input
                        type={"email"}
                        name='email'
                        placeholder='abc@gmail.com'
                        value={details.email}
                        onChange={(e) => loginCredentials(e)} />
                </div>
                <div className='data'>
                    <h4>Password</h4>
                    <input
                        type={"password"}
                        name='password'
                        value={details.password}
                        onChange={(e) => loginCredentials(e)} />
                </div>
                <div className="button">
                    <button onClick={(e) => logged(e)}>Login</button>
                </div>
                <h4>New User? Please..
                    <Link to={'/'}>Register</Link>
                </h4>
        </div>

    )
}

export default Login