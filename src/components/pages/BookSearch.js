import React, { Component } from 'react'
import { DebounceInput } from 'react-debounce-input'
import * as BooksAPI from '../../BooksAPI'
import { Link } from 'react-router-dom'
import Book from '../Book';


class BookSearch extends Component {

    constructor(props) {
        super(props);
        this.state = {
            books: [],
            queriedBooks: [],
            query: ''
        }
    }

    componentDidMount() {
        BooksAPI.getAll()
        .then((resp) => {
            this.setState({ books: resp })
        })
    }

    getQueryUpdate = (query) => {
        this.setState({query: query}, this.submitBookQuery)
    }

    submitBookQuery = () => {
        let currentSearch = this.state.query
        if(currentSearch === '' || currentSearch === undefined) {
            return this.setState({ queriedBooks: [] })
        }
        BooksAPI.search(currentSearch.trim())
        .then(resp => {
            if(resp.error) {
                return this.setState({ queriedBooks: [] })
            }
            else {
                return this.setState({ queriedBooks: resp })
            }
        })
    }

    getBookUpdate = (book, shelf) => {
        BooksAPI.update(book, shelf)
        .then(resp => {
            book.shelf = shelf
            this.setState(state => ({
                books: state.books.filter(b => b.id !== book.id).concat([book])
            }))
        })
    }

    render() {

        const { books, query, queriedBooks } = this.state

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
                            onChange={(event) => this.getQueryUpdate(event.target.value)}
                        />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {
                            queriedBooks.map((book, key) =>
                                <Book
                                    getBookUpdate={this.getBookUpdate}
                                    key={key}
                                    book={book}
                                />
                            )
                        }
                    </ol>
                </div>
            </div>
        )
    }
}

export default BookSearch
