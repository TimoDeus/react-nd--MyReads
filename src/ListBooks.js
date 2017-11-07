import React from 'react';
import Book from './Book';

const ListBooks = props => {
	const {getShelfForBook, books, changeBook} = props;
	return (
		<ol className="books-grid">
			{books.map(book => (
				<li key={book.id}>
					<Book book={book} getShelfForBook={getShelfForBook} changeBook={changeBook}/>
				</li>
			))}
		</ol>
	);
};

export default ListBooks;
