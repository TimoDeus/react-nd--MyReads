import React from 'react';
import Book from './Book';
import PropTypes from 'prop-types';

const ListBooks = props => {
	const {books, addBookToShelf} = props;
	return (
		<ol className="books-grid">
			{books.map(book =>
				<li key={book.id}>
					<Book book={book} addBookToShelf={addBookToShelf}/>
				</li>
			)}
		</ol>
	);
};

ListBooks.propTypes = {
	addBookToShelf: PropTypes.func.isRequired,
	books: PropTypes.array.isRequired
};

export default ListBooks;
