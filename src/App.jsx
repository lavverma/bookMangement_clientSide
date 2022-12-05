// require('dotenv').config()
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Registration from './components/registration'
import Login from "./components/login"
import BookList from './components/bookList'
import BookDetails from './components/bookDetails'
import CreateBook from './components/createBook'
import BookEdit from './components/bookEdit'
import DeleteBook from './components/deleteBook'
import LogOut from './components/logOut'


const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<Registration />} />
          <Route path='/login' element={<Login />} />
          <Route path='/bookList' element={<BookList />} />
          <Route path='/bookDetails/:bookId' element={<BookDetails />} />
          <Route path='/createBook' element={<CreateBook />} />
          <Route path='/bookEdit/:bookId' element={<BookEdit />} />
          <Route path='/deleteBook/:bookId' element={<DeleteBook />} />
          <Route path='/logOut' element={<LogOut />} />
          <Route path='*' element={<Registration />} />
        </Routes>
      </Router>

    </div>
  )
}

export default App