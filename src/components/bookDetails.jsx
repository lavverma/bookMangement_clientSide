import React, { useEffect, useState } from 'react'
import {  Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

const url = import.meta.env.VITE_SERVER_URL

const BookDetails = () => {
  const navigate = useNavigate()
    const [book, setBook] = useState({})
    const bookId = useParams()
   const idObj = JSON.parse(JSON.stringify(bookId))
   const id = idObj.bookId;

   const token = localStorage.getItem('token')
    const bookDetails = async(id) => {
      try{
        const res = await axios.get(`${url}/books/${id}`,{ headers: { 'x-api-key': token } })
        setBook({...res.data.data})
      }catch (err) {
        let error = err.response.data.message
        if(error ==  "jwt expired" || "Please give TOKEN in request"){
            navigate('/login')
        }else alert(error)
    }      
    }
    useEffect(()=>{
      bookDetails(id)
    },[])

    
  return (
    <div>
      <Link to={`/bookEdit/${id}`} state ={book} >
      <button>Edit</button>
      </Link>
      <Link to={`/deleteBook/${id}`}>
      <button>Delete</button>
      </Link>
      <div>
      <div>
        <h3>Book Title</h3>
        <h3>{book.title}</h3>
        </div>
        <div>
        <h4>Excerpt</h4>
        <p>{book.excerpt}</p>
        </div>
        <div>
        <h4>Category</h4>
        <p>{book.category}</p>
        </div>
        <div>
        <h4>Subcategory</h4>
        <p>{book.subcategory}</p>
        </div>
        <div>
        <h4>Release Date</h4>
        <p>{book.releasedAt}</p>
        </div>
      </div>
      
      
      </div>
  )
}

export default BookDetails