const tableData = document.querySelector('.table-data');
const titleInput = document.getElementById('book-title');
const authorInput = document.getElementById('author');
const pagesInput = document.getElementById('pages');
const readInput = document.querySelector('input[type="checkbox"]');

const myLibrary = [
	new Book(1, 'The Alpha ing Stubborn Mate', 'Jude DH', 232, false),
	new Book(2, 'The Son of The Richest Man', 'Small.Li', 82, true),
	new Book(3, 'Mistaken Marriage, Unexpected Love', 'Jude DH', 117, true),
];

function Book(id, title, author, pages, read = false) {
	this.id = id;
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.read = read;
}

Book.prototype.toggleRead = function () {
	this.read = !this.read;
	console.log(`Book ID ${this.id} read status updated: ${this.read}`);
};

document.querySelector('.table-data').addEventListener('change', function (event) {
	if (event.target.classList.contains('read-status')) {
		const bookId = parseInt(event.target.getAttribute('data-id'));
		const book = myLibrary.find((book) => book.id === bookId);

		if (book) {
			book.toggleRead();

			// Update the status text beside the checkbox
			const statusText = event.target.nextElementSibling;
			statusText.textContent = book.read ? 'Read' : 'Not Read';

			renderBooks(); // Refresh UI
		}
	}
});

renderBooks();

function addBookToLibrary() {
	const id = myLibrary.length + 1;
	const title = titleInput.value.trim();
	const author = authorInput.value.trim();
	const pages = parseInt(pagesInput.value.trim());
	const read = readInput.checked;

	if (title.length > 1 && author.length > 1 && pages >= 1) {
		const newBook = new Book(id, title, author, pages, read);
		myLibrary.push(newBook);
		renderBooks();

		titleInput.value = '';
		authorInput.value = '';
		pagesInput.value = '';
		readInput.checked = false;
	} else {
		console.log('value must not be empty');
	}
}

function renderBooks() {
	let tableHtml = '';
	tableData.innerHTML = '';

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
						 <td><input type="checkbox" class="read-status" data-id="${book.id}" ${book.read ? 'checked' : ''}>
                <span class="status-text">${book.read ? 'Read' : 'Not Read'}</span>
              </td>
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

document.getElementById('add-book').addEventListener('click', addBookToLibrary);
