const tableData = document.querySelector('.table-data');
const titleInput = document.getElementById('book-title');
const authorInput = document.getElementById('author');
const pagesInput = document.getElementById('pages');
const read = document.querySelector('input[type="checkbox"]');
const label = document.querySelector('label[for="read-book"]');

const myLibrary = [
	{ id: 1, title: 'The Alpha ing Stubborn Mate', pages: 232, author: 'Jude DH', read: 'Not Read' },
	{ id: 2, title: 'The Son of The Richest Man', pages: 82, author: 'Small.Li', read: 'Read' },
	{ id: 3, title: 'Mistaken Marriage, Unexpected Love', pages: 117, author: 'Jude DH', read: 'Read' },
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

document.getElementById('add-book').addEventListener('click', addBookToLibrary);

function addBookToLibrary(id, title, author, pages, read) {
	// take params, create a book then store it in the array
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

	myLibrary.forEach((book) => {
		tableHtml += `
				<tbody>
					<tr>
						<td>${book.id}</td>
						<td>${book.title}</td>
						<td colspan="2">${book.author}</td>
						<td>${book.pages}</td>
						<td>${book.read}</td>
						<td><button class="delete-btn">Delete</button></td>
					</tr>
				</tbody>
		`;
	});

	tableData.innerHTML = tableHtml;
}

renderBooks();
