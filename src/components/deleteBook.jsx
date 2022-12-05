import React, { useState,useEffect } from 'react'
import { Link, useNavigate, useParams } from "react-router-dom"
import axios from "axios"

const url = import.meta.env.VITE_SERVER_URL

const DeleteBook = () => {
    const navigate = useNavigate()
    const [show, setShow] = useState(false)
    const bookId = useParams()
    const idObj = JSON.parse(JSON.stringify(bookId))
    const id = idObj.bookId;
    const token = localStorage.getItem("token")

    const bookDetails = async (id) => {
        try {
            const res = await axios.get(`${url}/books/${id}`, { headers: { 'x-api-key': token } })
        } catch (err) {
            let error = err.response.data.message
            if (error == "jwt expired" || "Please give TOKEN in request") {
                navigate('/login')
            } else alert(error)
        }

    }
    useEffect(() => {
        bookDetails(id)
    }, [])

    const deleteBook = async () => {
        try {
            const res = await axios.delete(`${url}/books/${id}`, { headers: { 'x-api-key': token } })
            setShow(true)
        } catch (err) {
            alert(err.response.data.message)
        }
    }


    return (
        <div>
            {show ?
                <div>
                    <h1>Book Successfully Deleted</h1>
                    <Link to={'/bookList'}>Go To Book List</Link>
                </div> :
                <div>
                    <h2>You want to <i>Delete</i> this Book ?</h2>
                    <Link to={`/bookDetails/${id}`}>
                        <button>NO</button>
                    </Link>
                    <button onClick={() => deleteBook()}>YES</button>
                </div>
            }
        </div>
    )
}

export default DeleteBook