import React from 'react';
import BookShelf from './BookShelf';

const ListShelves = props => {
	const {shelves, getBooksForShelf, changeBook} = props;
	return (
		<div className="list-books">
			<div className="list-books-title">
				<h1>MyReads</h1>
			</div>
			<div className="list-books-content">
				<div>
					{
						shelves.map(shelfId => {
							return <BookShelf key={shelfId} id={shelfId} books={getBooksForShelf(shelfId)} changeBook={changeBook}/>
						})
					}
				</div>
			</div>
			<div className="open-search">
				<a onClick={() => this.setState({showSearchPage: true})}>Add a book</a>
			</div>
		</div>);
};

export default ListShelves;
