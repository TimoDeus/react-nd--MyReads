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
			this.setState({searchResults: result});
		}
	);

	render() {
		const {changeBook, getShelfForBook} = this.props;
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
					{searchResults && <ListBooks books={searchResults} changeBook={changeBook} getShelfForBook={getShelfForBook}/>}
				</div>
			</div>
		);
	}
}

SearchBooks.propTypes = {
	changeBook: PropTypes.func.isRequired,
	getShelfForBook: PropTypes.func.isRequired
};

export default SearchBooks;
