import React from 'react';
import * as BooksAPI from './BooksAPI'
import './App.css';
import {Route, Link} from 'react-router-dom';
import ListShelves from './ListShelves';

class BooksApp extends React.Component {
	state = {
		books: []
	};

	componentDidMount() {
		this.fetchAllBooks();
	}

	fetchAllBooks = () => BooksAPI.getAll().then(books => this.setState({books}));

	changeBook = (bookId, shelfId) => {
		BooksAPI.update(bookId, shelfId).then(
			data => {} // TODO do something clever with the rather useless response
		)
	};

	getBooksForShelf = shelfId => {
		return this.state.books.filter(book => book.shelf === shelfId);
	};

	render() {
		return (
			<div className="app">
				<Route path='/search' render={() => (
					<div className="search-books">
						<div className="search-books-bar">
							<Link to='/'>Close</Link>
							<div className="search-books-input-wrapper">
								<input type="text" placeholder="Search by title or author"/>
							</div>
						</div>
						<div className="search-books-results">
							<ol className="books-grid"/>
						</div>
					</div>
				)}/>
				<Route exact path='/' render={() => (
					<ListShelves
						shelves={[...new Set(this.state.books.map(book => book.shelf))]}
						getBooksForShelf={this.getBooksForShelf}
						changeBook={this.changeBook}
					/>
				)}/>
			</div>
		)
	}
}

export default BooksApp
