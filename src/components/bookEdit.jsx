import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useLocation, useNavigate,useParams } from 'react-router-dom'

const url = import.meta.env.VITE_SERVER_URL

const BookEdit = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const [edit, setEdit] = useState({...location.state})
    const [show , setShow] = useState(false)
    const bookId = useParams()
   const idObj = JSON.parse(JSON.stringify(bookId))
   const id = idObj.bookId;
// console.log(id)
const token = localStorage.getItem('token')
    const bookDetails = async(id) => {
      try{
        const res = await axios.get(`${url}/books/${id}`,{ headers: { 'x-api-key': token } })

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

    const newDetails =(e)=>{
       const {name ,  value} = e.target
       setEdit({
        ...edit,
        [name] : value
       })
    }

    const updateBook = async () => {
        try {
            const res = await axios.put(`${url}/books/${id}`,
                edit,
                { headers: { 'x-api-key': token } }
            )
            setShow(true)
        } catch (err) {
            let error = err.response.data.message
            if(error == "user can't be manipulate someone else data!"){
                alert(error)
                navigate(`/bookDetails/${id}`)
            }
            else alert(error)
        }
    }

    return (

        <div>
            {show ?
                <div>
                    <h1>Book Updated Successfully</h1>
                    <Link to={'/bookList'}>Go To Book List</Link>
                </div> :
                <div>
                    <div>
                        <h3>Book Title</h3>
                        <textarea type={'text'} value={edit.title} name="title" onChange={(e) => { newDetails(e) }} />
                    </div>
                    <div>
                        <h4>Excerpt</h4>
                        <textarea type={'text'} value={edit.excerpt} name="excerpt" onChange={(e) => { newDetails(e) }} />
                    </div>
                    <div>
                        <h4>Release Date</h4>
                        <input ype={'text'} value={edit.releasedAt} name="releasedAt" onChange={(e) => { newDetails(e) }} />
                    </div>
                    <button onClick={() => updateBook()}>Update Book</button>
                </div>}

        </div>
    )
}

export default BookEdit