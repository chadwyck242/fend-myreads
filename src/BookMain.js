import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Book from './Book'


class BookMain extends Component {
    render() {
        console.log(this.props.books)
        const { books, changeShelf } = this.props
        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        <div className="bookshelf">
                            <h2 className="bookshelf-title">Currently Reading</h2>
                            <div className="bookshelf-books">
                                <ol className="books-grid">
                                    {books.filter((book) => book.shelf === 'currentlyReading').map((book) => (
                                        <li key={book.id}>
                                            <Book
                                                book={book}
                                                changeShelf={changeShelf}
                                            />
                                        </li>
                                    ))
                                    }
                                </ol>
                            </div>
                        </div>
                        <div className="bookshelf">
                            <h2 className="bookshelf-title">Want to Read</h2>
                            <div className="bookshelf-books">
                                <ol className="books-grid">
                                    {books.filter((book) => book.shelf === 'wantToRead').map((book) => (
                                        <li key={book.id}>
                                            <Book
                                                book={book}
                                                changeShelf={changeShelf}
                                            />
                                        </li>
                                    ))
                                    }
                                </ol>
                            </div>
                        </div>
                        <div className="bookshelf">
                            <h2 className="bookshelf-title">Read</h2>
                            <div className="bookshelf-books">
                                <ol className="books-grid">
                                    {books.filter((book) => book.shelf === 'read').map((book) => (
                                        <li key={book.id}>
                                            <Book
                                                book={book}
                                                changeShelf={changeShelf}
                                            />
                                        </li>
                                    ))
                                    }
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="open-search">
                    <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
                </div>
            </div>
        )
    }
}

export default BookMain
