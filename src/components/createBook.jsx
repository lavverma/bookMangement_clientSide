import React, { useState } from 'react'
import axios from 'axios'
import jwt from "jwt-decode"
import { Link } from 'react-router-dom'

const url = import.meta.env.VITE_SERVER_URL

const CreateBook = () => {
    const [show, setShow] = useState(false)
    const [book, setBook] = useState({
        title: '',
        excerpt: '',
        userId: '',
        ISBN: '',
        category: '',
        subcategory: '',
        releasedAt: ''
    })

    const token = localStorage.getItem("token")
    const userId = jwt(token).userId
    const newBook = (e) => {
        const { name, value } = e.target
        setBook({
            ...book,
            [name]: value,
            userId: userId
        })
    }

    const addBook = async () => {
        try {
            const res = await axios.post(
                `${url}/books`,
                book,
                { headers: { "x-api-key": token } }
            )
            setShow(true)
        } catch (err) {
            alert(err.response.data.message)
        }

    }

    return (
        <div>
            {show ? <div>
                <h1>New Book Added Successfully</h1>
                <Link to={`/bookList`}>Go To Book List</Link>
            </div>
                : (<div>
                    <div>
                        <h4>Title Of Your Book</h4>
                        <input
                            type='text'
                            name='title'
                            value={book.title}
                            onChange={(e) => newBook(e)} />
                        <h4>Excerpt Of Your Book</h4>
                        <input
                            type='text'
                            name='excerpt'
                            value={book.excerpt}
                            onChange={(e) => newBook(e)} />
                        <h4>Book ISBN</h4>
                        <input
                            type='text'
                            name='ISBN'
                            value={book.ISBN}
                            onChange={(e) => newBook(e)} />
                        <h4>Category</h4>
                        <input
                            type='text'
                            name='category'
                            value={book.category}
                            onChange={(e) => newBook(e)} />
                        <h4>Subcategory</h4>
                        <input
                            type='text'
                            name='subcategory'
                            value={book.subcategory}
                            onChange={(e) => newBook(e)} />
                        <h4>Released Date</h4>
                        <input
                            type='text'
                            name='releasedAt'
                            value={book.releasedAt}
                            placeholder='YYYY-MM-DD'
                            onChange={(e) => newBook(e)} />
                    </div>
                    <button onClick={() => { addBook() }}>Ad to Book List</button>
                </div>
                )}
        </div>
    )
}

export default CreateBook