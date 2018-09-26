import React, { Component } from 'react'
import Book from './Book'


class BookShelf extends Component {

    componentDidMount() {
        console.log(this)
    }

    render() {
        const { books, shelfName, getBookUpdate } = this.props
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{shelfName}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {
                            books.map((book, key) =>
                                <Book
                                    getBookUpdate={getBookUpdate}
                                    book={book}
                                    key={book.id}
                                />)
                        }
                    </ol>
                </div>
            </div>
        )
    }
}

export default BookShelf
