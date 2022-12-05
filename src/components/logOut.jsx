import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const LogOut = () => {
    const [show, setShow] = useState(false)
    const logOut = () => {
        localStorage.setItem("token", null)
        setShow(true)
    }
    return (
        <div>
            {show ?
                <div>
                    <h1>Successfully Logout</h1>
                    <Link to={'/login'} >Go to Login..</Link>
                </div> :
                <div>
                    <h2>You want to Logout ?</h2>
                    <button onClick={() => logOut()}>Yes</button>
                    <Link to={'/bookList'}>
                    <button >No</button>
                    </Link>
                    
                </div>
            }
        </div>
    )
}

export default LogOut