import React, {Component} from 'react';
import {Link} from "react-router-dom";
import * as BooksAPI from './BooksAPI'
import ListBooks from './ListBooks';

class SearchBooks extends Component {

	state = {
		query: '',
		searchResults: []
	};

	updateQuery = newQuery => {
		const trimmedQuery = newQuery.trim();
		this.setState({query: trimmedQuery});
		this.searchBooks(trimmedQuery);
	};

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
					{searchResults && <ListBooks books={searchResults} changeBook={changeBook} getShelfForBook={getShelfForBook} />}
				</div>
			</div>
		);
	}
}

export default SearchBooks;
