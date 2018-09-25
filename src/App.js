import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import BookMain from './BookMain'
import BookSearch from './BookSearch'
import './App.css'

class BooksApp extends React.Component {

    constructor(props) {
        super(props);
        this.state = { books: [] };
    }

    componentDidMount() {
        BooksAPI.getAll()
        .then((books) => {
            this.setState({ books: books })
        })
    }

    changeShelf = (book, shelf) => {
        BooksAPI.update(book, shelf)
        .then(BooksAPI.getAll()
        .then((books) => {
            this.setState({ books: books })
        }));
    }

    componentWill

    render() {
        return (
            <div className="app">
                <Route exact path='/' render={() => (
                    <BookMain
                        books={this.state.books}
                        changeShelf={this.changeShelf}
                    />
                )}/>

                <Route path='/search' render={() => (
                    <BookSearch
                        changeShelf={this.changeShelf}
                        books={this.state.books}
                    />
                )}/>
            </div>
        )
    }
  }

export default BooksApp
