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
	addBookToShelf = (book, shelfId) => {
		BooksAPI.update(book, shelfId).then(
			() => this.fetchAndGroupAllBooks()
		)
	};

	/**
	 * shelf id to name mapping
	 * @param shelfId
	 * @return {string} human readable shelf name
	 */
	getShelfName = shelfId => {
		return shelfId === 'currentlyReading' ? 'Currently Reading' :
			(shelfId === 'wantToRead' ? 'Want To Read' : 'Read');
	};

	/**
	 * associate shelf with id, name and corresponding books
	 * @return {Array|*|Object}
	 */
	prepareShelves = () => {
		return Object.keys(this.state).map(shelfId => ({
			id: shelfId,
			name: this.getShelfName(shelfId),
			books: this.state[shelfId] || []
		}));
	};

	render() {
		const shelves = this.prepareShelves();
		return (
			<div className="app">
				<Route path='/search' render={() =>
					<SearchBooks addBookToShelf={this.addBookToShelf} shelves={shelves}/>
				}/>
				<Route exact path='/' render={() =>
					<ListShelves addBookToShelf={this.addBookToShelf} shelves={shelves}/>
				}/>
			</div>
		)
	}
}

export default BooksApp
