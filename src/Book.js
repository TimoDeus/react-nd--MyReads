import React from 'react';
import {knownShelves} from './utils/knownShelves';

const Book = props => {
	const {getShelfForBook, book, changeBook} = props;
	return (
		<div className="book">
			<div className="book-top">
				<div className="book-cover" style={{
					backgroundImage: `url("${book.imageLinks ? book.imageLinks.thumbnail : ''}")`
				}}/>
				<div className="book-shelf-changer">
					<select value={getShelfForBook(book)} defaultValue='none' onChange={event => changeBook(book, event.target.value)}>
						<option value="none" disabled>Move to...</option>
						{knownShelves.map(shelf =>
							<option key={shelf.id} value={shelf.id}>{shelf.name}</option>
						)}
						<option value="none">None</option>
					</select>
				</div>
			</div>
			<div className="book-title">{book.title}</div>
			{book.authors && <div className="book-authors">{book.authors.join(', ')}</div> }
		</div>
	);
};

export default Book;
