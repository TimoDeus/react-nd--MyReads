import React from 'react';
import Book from './Book';
import PropTypes from 'prop-types';

const ListBooks = props => {
	const {getShelfForBook, books, changeBook} = props;
	return (
		<ol className="books-grid">
			{books.map(book =>
				<li key={book.id}>
					<Book book={book} getShelfForBook={getShelfForBook} changeBook={changeBook}/>
				</li>
			)}
		</ol>
	);
};

ListBooks.propTypes = {
	changeBook: PropTypes.func.isRequired,
	getShelfForBook: PropTypes.func.isRequired,
	books: PropTypes.arrayOf(Book.propTypes)
};

export default ListBooks;
