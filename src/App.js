import React from 'react'
import { Route } from 'react-router-dom'
import BookMain from './components/pages/BookMain'
import BookSearch from './components/pages/BookSearch'
import './App.css'

class BooksApp extends React.Component {

    render() {
        return (
            <div className="app">
                <Route exact path='/' component={BookMain} />
                <Route exact path='/search' component={BookSearch} />
            </div>
        )
    }
}

export default BooksApp
