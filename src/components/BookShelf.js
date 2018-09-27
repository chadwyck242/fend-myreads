import React from 'react'
import Book from './Book'


function BookShelf(props) {

    // componentDidMount() {
    //     console.log(this)
    // }

    const { books, shelfName } = props
    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{shelfName}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {
                        books.map((book, key) =>
                            <Book
                                book={book}
                                key={key}
                                getBookUpdate={props.getBookUpdate}
                            />)
                    }
                </ol>
            </div>
        </div>
    )
}

export default BookShelf
