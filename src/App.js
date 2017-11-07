import React from 'react';
import * as BooksAPI from './BooksAPI'
import './App.css';
import {Route} from 'react-router-dom';
import ListShelves from './ListShelves';
import SearchBooks from './SearchBooks';

class BooksApp extends React.Component {
	state = {
		currentlyReading: [],
		wantToRead: [],
		read: []
	};

	componentDidMount() {
		this.fetchAndGroupAllBooks();
	}

	fetchAndGroupAllBooks = () => BooksAPI.getAll().then(
		books => {
			const result = books.reduce((obj, book) => {
				obj[book.shelf] = obj[book.shelf] || [];
				obj[book.shelf].push(book);
				return obj;
			}, Object.create(null));
			this.setState(result);
		}
	);

	changeBook = (book, shelfId) => {
		BooksAPI.update(book, shelfId).then(
			() => this.fetchAndGroupAllBooks()
		)
	};

	getBooksForShelf = shelfId => {
		return this.state[shelfId];
	};

	getShelfForBook = book => {
		return Object.keys(this.state).find(shelfId => this.state[shelfId].some(elem => elem.id === book.id));
	};

	render() {
		return (
			<div className="app">
				<Route path='/search' render={() => (
					<SearchBooks
						changeBook={this.changeBook}
						getShelfForBook={this.getShelfForBook}
					/>
				)}/>
				<Route exact path='/' render={() => (
					<ListShelves
						getBooksForShelf={this.getBooksForShelf}
						getShelfForBook={this.getShelfForBook}
						changeBook={this.changeBook}
					/>
				)}/>
			</div>
		)
	}
}

export default BooksApp
