import React from 'react';
import {knownShelves} from './utils/knownShelves';
import PropTypes from 'prop-types';

const Book = props => {
	const {getShelfForBook, book, changeBook} = props;
	const selectedValue = getShelfForBook(book);
	return (
		<div className="book">
			<div className="book-top">
				<div className="book-cover" style={{
					backgroundImage: `url("${book.imageLinks ? book.imageLinks.thumbnail : ''}")`
				}}/>
				<div className="book-shelf-changer">
					<select value={selectedValue} defaultValue='none' onChange={event => changeBook(book, event.target.value)}>
						<option value="none" disabled>Move to...</option>
						{knownShelves.map(shelf =>
							<option key={shelf.id} value={shelf.id}>{shelf.name}</option>
						)}
						<option value="none">None</option>
					</select>
				</div>
			</div>
			<div className="book-title">{book.title}</div>
			{book.authors && <div className="book-authors">{book.authors.join(' | ')}</div>}
		</div>
	);
};

Book.propTypes = {
	changeBook: PropTypes.func.isRequired,
	getShelfForBook: PropTypes.func.isRequired,
	book: PropTypes.shape({
		id: PropTypes.string.isRequired,
		title: PropTypes.string.isRequired,
		authors: PropTypes.arrayOf(PropTypes.string),
		imageLinks: PropTypes.shape({
			thumbnail: PropTypes.string
		}),
	})
};

export default Book;
