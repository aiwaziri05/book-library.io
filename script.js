const tableData = document.querySelector('.table-data');
const titleInput = document.getElementById('book-title');
const authorInput = document.getElementById('author');
const pagesInput = document.getElementById('pages');
const read = document.querySelector('input[type="checkbox"]');
const label = document.querySelector('label[for="read-book"]');

const myLibrary = [
	// { id: 1, title: 'The Alpha ing Stubborn Mate', pages: 232, author: 'Jude DH', read: 'Not Read' },
	// { id: 2, title: 'The Son of The Richest Man', pages: 82, author: 'Small.Li', read: 'Read' },
	// { id: 3, title: 'Mistaken Marriage, Unexpected Love', pages: 117, author: 'Jude DH', read: 'Read' },
];

function Book(id, title, author, pages, read) {
	// the constructor...
	this.id = id;
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.read = read;
}

renderBooks();

function getIdNumber() {
	return myLibrary.length + 1;
}

document.getElementById('add-book').addEventListener('click', addBookToLibrary);

function addBookToLibrary(id, title, author, pages, read) {
	// take params, create a book then store it in the array
	id = getIdNumber();
	title = titleInput.value.trim();
	author = authorInput.value.trim();
	pages = pagesInput.value.trim();

	if (title.length > 1 && author.length > 1 && pages >= 1) {
		const newBook = new Book(id, title, author, pages, read);
		myLibrary.push(newBook);
		renderBooks();

		titleInput.value = '';
		authorInput.value = '';
		pagesInput.value = '';
	} else {
		console.log('value must not be empty');
	}
}

// console.log(myLibrary);

function renderBooks() {
	let tableHtml = '';
	tableData.innerHTML = '';
	const existingMessage = document.querySelector('.no-message-data');
	if (existingMessage) {
		existingMessage.remove();
	}

	if (myLibrary.length === 0) {
		const message = document.createElement('p');
		message.textContent = 'No books available. Please add a book!';
		message.classList.add('no-message-data');
		document.querySelector('.message-container').appendChild(message);
	} else {
		myLibrary.forEach((book) => {
			tableHtml += `
					<tbody>
						<tr>
							<td>${book.id}</td>
							<td>${book.title}</td>
							<td colspan="2">${book.author}</td>
							<td>${book.pages}</td>
							<td>${book.read}</td>
							<td><button class="delete-btn" data-id="${book.id}">Delete</button></td>
						</tr>
					</tbody>
			`;
		});
		tableData.innerHTML = tableHtml;
	}
}

document.querySelector('.table-data').addEventListener('click', function (event) {
	if (event.target.classList.contains('delete-btn')) {
		deleteBook.call(event.target);
	}
});

function deleteBook() {
	const bookId = parseInt(this.getAttribute('data-id'));
	const bookIndex = myLibrary.findIndex((book) => book.id === bookId);

	if (bookIndex !== -1) {
		myLibrary.splice(bookIndex, 1);
		renderBooks();
	} else {
		console.log('book not found!');
	}
}
