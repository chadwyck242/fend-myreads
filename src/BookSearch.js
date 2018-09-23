import React, {Component} from 'react'
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
        const { changeShelf } = this.props

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <link className="close-search" to="/" >Close</link>
                    <div className="search-books-input-wrapper">
                        <input
                            type="text"
                            placeholder="Search by title or author"
                            value={ query }
                            onChange={(event) => this.updateQuery(event.target.value)}
                        />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {queriedBooks.map(queriedBook => (
                            <li key={queriedBook.id}>
                                <Book
                                    book={queriedBook}
                                    changeShelf={changeShelf}
                                />
                            </li>
                        ))}
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
