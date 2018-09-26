import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from '../../BooksAPI'
import BookShelf from '../BookShelf'

class BookMain extends Component {

    constructor(props) {
        super(props);
        this.state = {
            books: []
        }
    }

    componentDidMount() {
        BooksAPI.getAll()
        .then((resp) => {
            this.setState({ books: resp })
        })
    }

    getBookUpdate = (book, shelf) => {
        BooksAPI.update(book, shelf)
        .then(resp => {
            book.shelf = shelf
            this.setState(state => ({
                books: state.books.filter(b => b.id === book.id).concat([book])
            }))
        })
    }

    render() {
        const { books } = this.state
        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        <BookShelf
                            getBookUpdate={this.getBookUpdate}
                            shelfName='Currently Reading'
                            books={books.filter((book) => book.shelf === 'currentlyReading'
                            ) }
                        />
                        <BookShelf
                            getBookUpdate={this.getBookUpdate}
                            shelfName='Want to Read'
                            books={books.filter((book) => book.shelf === 'wantToRead'
                            ) }
                        />
                        <BookShelf
                            getBookUpdate={this.getBookUpdate}
                            shelfName='Read'
                            books={books.filter((book) => book.shelf === 'read'
                            ) }
                        />
                    </div>
                </div>
                <div className="open-search">
                    <Link to="/search">Add a book</Link>
                </div>
            </div>
        )
    }
}

export default BookMain
