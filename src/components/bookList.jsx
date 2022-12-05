import React, { useEffect, useState } from 'react'
import axios from "axios"
import { Link, useNavigate } from 'react-router-dom'


const url = import.meta.env.VITE_SERVER_URL


const BookList = () => {
    const navigate = useNavigate()
    const [bookList, setBookList] = useState([])
    
    const token = localStorage.getItem('token')

    const fetchData = async () => {
        try {
            const res = await axios.get(`${url}/books`, { headers: { 'x-api-key': token } })
            const allBook = res.data.data
            setBookList(allBook)
        } catch (err) {
            let error = err.response.data.message
            if(error ==  "jwt expired" || "Please give TOKEN in request"){
                navigate('/login')
            }else alert(error)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])


    return (
        <div>
            <Link to={'/createBook'}>
            <button>Add Book</button>
            </Link>

            <Link to={'/logOut'}>
            <button>LogOut</button>
            </Link>
      
            {
                bookList.map(({ _id, title } , index) => (
                    <Link to={`/bookDetails/${_id}`} key = {index}>
                        <div>
                        {title}
                        </div>
                    </Link>
                )
                )
            }

        </div>
    )
}

export default BookList