import React from 'react';
import Book from './Book';

const BookShelf = props => {
	const {title, shelf, books} = props;
	return (
		<div className="bookshelf">
			<h2 className="bookshelf-title">{title}</h2>
			<div className="bookshelf-books">
				<ol className="books-grid">
					<li>
						{books.map(book => <Book key={shelf.id} currentShelf={shelf}/>)}
						<Book currentShelf={shelf}/>
					</li>
				</ol>
			</div>
		</div>
	);
};

export default BookShelf;
