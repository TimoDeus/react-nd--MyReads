import React from 'react';
import {Link} from 'react-router-dom';
import ListBooks from './ListBooks';
import {knownShelves} from './utils/knownShelves';

const ListShelves = props => {
	const {getBooksForShelf, getShelfForBook, changeBook} = props;
	return (
		<div className="list-books">
			<div className="list-books-title">
				<h1>MyReads</h1>
			</div>
			<div className="list-books-content">
				<div>
					{knownShelves.map(({id, name}) =>
						<div className="bookshelf" key={id}>
							<h2 className="bookshelf-title">{name}</h2>
							<div className="bookshelf-books">
								<ListBooks books={getBooksForShelf(id)}
													 changeBook={changeBook}
													 getShelfForBook={getShelfForBook}/>
							</div>
						</div>
					)}
				</div>
			</div>
			<div className="open-search">
				<Link to='/search'>Add a book</Link>
			</div>
		</div>);
};

export default ListShelves;
