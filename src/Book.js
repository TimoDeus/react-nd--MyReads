import React from 'react';
import PropTypes from 'prop-types';

const Book = props => {
	const {book, addBookToShelf} = props;
	return (
		<div className="book">
			<div className="book-top">
				<div className="book-cover" style={{
					backgroundImage: `url("${book.imageLinks ? book.imageLinks.thumbnail : ''}")`
				}}/>
				<div className="book-shelf-changer">
					<select value={book.shelf} onChange={event => addBookToShelf(book, event.target.value)}>
						<option value="move" disabled>Move to...</option>
						<option value="currentlyReading">Currently Reading</option>
						<option value="wantToRead">Want To Read</option>
						<option value="read">Read</option>
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
	addBookToShelf: PropTypes.func.isRequired,
	book: PropTypes.shape({
		id: PropTypes.string.isRequired,
		title: PropTypes.string.isRequired,
		shelf: PropTypes.string,
		authors: PropTypes.arrayOf(PropTypes.string),
		imageLinks: PropTypes.shape({
			thumbnail: PropTypes.string
		}),
	})
};

export default Book;
