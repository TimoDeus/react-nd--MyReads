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

	/**
	 * get all books and group them by the shelf they are on. store result in state.
	 */
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

	/**
	 * add book to shelf.
	 *
	 * Note: because the API response sucks and is a pain to handle, fetch all books again afterwards.
	 *
	 * @param {object} book the book object to modify
	 * @param {string} shelfId the new shelf
	 */
	changeBook = (book, shelfId) => {
		BooksAPI.update(book, shelfId).then(
			() => this.fetchAndGroupAllBooks()
		)
	};

	/**
	 * get all books on a given shelf
	 * @param shelfId
	 * @return array of books
	 */
	getBooksForShelf = shelfId => {
		return this.state[shelfId];
	};

	/**
	 * get the corresponding shelf for a book, undefined if there is none
	 * @param book book object
	 * @return {string} shelf id or undefined
	 */
	getShelfForBook = book => {
		return Object.keys(this.state).find(shelfId => this.state[shelfId].some(shelfElement => shelfElement.id === book.id));
	};

	render() {
		return (
			<div className="app">
				<Route path='/search' render={() =>
					<SearchBooks
						changeBook={this.changeBook}
						getShelfForBook={this.getShelfForBook}
					/>
				}/>
				<Route exact path='/' render={() =>
					<ListShelves
						changeBook={this.changeBook}
						getBooksForShelf={this.getBooksForShelf}
						getShelfForBook={this.getShelfForBook}
					/>
				}/>
			</div>
		)
	}
}

export default BooksApp
