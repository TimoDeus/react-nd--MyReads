import React from 'react';
import Book from './Book';

const BookShelf = props => {
	const {id, books, changeBook} = props;
	return (
		<div className="bookshelf">
			<h2 className="bookshelf-title">{id}</h2>
			<div className="bookshelf-books">
				<ol className="books-grid">
					<li>
						{books.map(book => <Book key={book.id} book={book} currentShelf={id} changeBook={changeBook}/>)}
					</li>
				</ol>
			</div>
		</div>
	);
};

export default BookShelf;
