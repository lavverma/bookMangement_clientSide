import React, { useState } from 'react'
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
            if(error == "credentials passed does not match"){
                alert('Your are not Registered yet..Please SignIn')
                navigate('/register')
            }
            else alert(error)
        }
    }

    return (
        <div>
            <h3>Please First Login With Your Account Credentials</h3>
            <div>
                <h2>Email</h2>
                <input
                    type={"email"}
                    name='email'
                    placeholder='abc@gmail.com'
                    value={details.email}
                    onChange={(e) => loginCredentials(e)} />
            </div>
            <div>
                <h2>Password</h2>
                <input
                    type={"password"}
                    name='password'
                    value={details.password}
                    onChange={(e) => loginCredentials(e)} />
            </div>
            <button onClick={(e) => logged(e)}>Login</button>
            <h4>New User? Please.. 
                <Link to={'/register'}>Register</Link>
            </h4>
        </div>
    )
}

export default Login