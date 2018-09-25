import React, {Component} from 'react'
import {DebounceInput} from 'react-debounce-input'
import * as BooksAPI from './BooksAPI'
import {Link} from 'react-router-dom'
import Book from './Book';
import PropTypes from 'prop-types'
// import escapeRegExp from 'escape-string-regexp'

class BookSearch extends Component {

    state = {
        query: '',
        queriedBooks: []
    }

    updateQuery = (query) => {
        this.setState({
            query: query
        })
        this.updateQueriedBooks(query);
    }

    updateQueriedBooks = (query) => {
        if (query) {
            BooksAPI.search(query)
            .then((queriedBooks) => {
                if(queriedBooks.error) {
                    this.setState({ queriedBooks: [] });
                } else {
                    this.setState({ queriedBooks: queriedBooks })
                }
            })
        } else {
            this.setState({ queriedBooks: [] });
        }
    }

    render() {

        const { query, queriedBooks } = this.state
        const { books, changeShelf } = this.props

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to="/" >Close</Link>
                    <div className="search-books-input-wrapper">
                        <DebounceInput
                            type="text"
                            placeholder="Search by title or author"
                            value={ query }
                            minLength={2}
                            debounceTimeout={300}
                            onChange={(event) => this.updateQuery(event.target.value)}
                        />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {queriedBooks.map(queriedBook => {
                            let activeShelf = 'none'
                            books.map(book => (
                                book.id === queriedBook.id ? activeShelf = book.shelf : ""
                            ))
                            return (
                                <li key={queriedBook.id}>
                                    <Book
                                        book={queriedBook}
                                        changeShelf={changeShelf}
                                        currentShelf={activeShelf}
                                    />
                                </li>
                            )
                        })}
                    </ol>
                </div>
            </div>
        )
    }

    static propTypes = {
        books: PropTypes.array.isRequired,
        changeShelf: PropTypes.func.isRequired
    }
}

export default BookSearch
