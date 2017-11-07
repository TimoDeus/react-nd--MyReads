import React, {Component} from 'react';
import {Link} from "react-router-dom";
import * as BooksAPI from './BooksAPI'
import ListBooks from './ListBooks';
import PropTypes from 'prop-types';

class SearchBooks extends Component {

	state = {
		query: '',
		searchResults: []
	};

	/**
	 * store new query in state and update search results
	 * @param {string} newQuery
	 */
	updateQuery = newQuery => {
		this.setState({query: newQuery});
		this.searchBooks(newQuery);
	};

	/**
	 * get the corresponding shelf for a book, 'none' if there is none
	 * @param book book object
	 * @return {string} shelf id
	 */
	getShelfForBook = book => {
		const {shelves} = this.props;
		const currentShelf = shelves.find(({books}) => books.some(shelfBook => shelfBook.id === book.id));
		return currentShelf ? currentShelf.id : 'none';
	};

	/**
	 * search for given term and update state with results.
	 *
	 * Note: API has no proper error handling. If error occured, response is an object, otherwise an array...
	 *
	 * @param {string} query search query
	 * @param {int} maxResults optional result size, 20 by default
	 */
	searchBooks = (query, maxResults = 20) => BooksAPI.search(query, maxResults).then(
		data => {
			const result = Array.isArray(data) ? data : [];
			result.map(book => {
				book.shelf = this.getShelfForBook(book);
				return book;
			});
			this.setState({searchResults: result});
		}
	);

	render() {
		const {addBookToShelf} = this.props;
		const {searchResults} = this.state;
		return (
			<div className="search-books">
				<div className="search-books-bar">
					<Link to='/' className='close-search'>Close</Link>
					<div className="search-books-input-wrapper">
						<input type="text" placeholder="Search by title or author" onChange={event => this.updateQuery(event.target.value)}/>
					</div>
				</div>
				<div className="search-books-results">
					{searchResults && <ListBooks books={searchResults} addBookToShelf={addBookToShelf} />}
				</div>
			</div>
		);
	}
}

SearchBooks.propTypes = {
	addBookToShelf: PropTypes.func.isRequired,
	shelves: PropTypes.array.isRequired
};

export default SearchBooks;
