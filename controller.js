function main() {
  const storageBooks = JSON.parse(localStorage.getItem("books")) || [];

  if (storageBooks.length) {
    renderBooks(storageBooks, 1); // Start on the first page
    generatePaginator(storageBooks); // Generate paginator for the stored books
  } else {
    renderBooks(Gbooks, 1);
    localStorage.setItem("books", JSON.stringify(Gbooks));
    generatePaginator(Gbooks); // Generate paginator for default books
  }
}

function sortBooks() {
    const storageBooks = JSON.parse(localStorage.getItem("books")) || [];
    const sortOption = document.getElementById("sortOptions").value;
  
    let sortedBooks;
    if (sortOption === "name") {
      sortedBooks = storageBooks.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOption === "price") {
      sortedBooks = storageBooks.sort((a, b) => a.price - b.price);
    }
  
    renderBooks(sortedBooks, currentPage);
    generatePaginator(sortedBooks);
  }
function deleteBook(id) {
  const storageBooks = JSON.parse(localStorage.getItem("books"));
  const updatedBooks = storageBooks.filter((book) => book.id !== id);

  localStorage.setItem("books", JSON.stringify(updatedBooks));
  renderBooks(updatedBooks, currentPage); // Reset to page 1 after deleting
  generatePaginator(updatedBooks); // Regenerate the paginator
  clearSideBar();
}
function readBook(id) {
  const storageBooks = JSON.parse(localStorage.getItem("books"));
  const book = storageBooks.find((book) => book.id === id);
  renderReadBook(book);
}
const addRate = (id) => {
  rate = document.getElementById("rate").value;
  let storageBooks = JSON.parse(localStorage.getItem("books"));

  const book = storageBooks.find((book) => book.id === id);
  book.rate = rate;
  localStorage.setItem("books", JSON.stringify(storageBooks));

  document.getElementById("rate-text").innerText = `Rate: ${rate}`;
};

const edit = (id) => {
  const storageBooks = JSON.parse(localStorage.getItem("books"));
  const book = storageBooks.find((book) => book.id === id);
  editInView(book);
};

const saveChanges = (id) => {
    const storageBooks = JSON.parse(localStorage.getItem("books"));
    let book;
  
    if (id != null) {
      book = storageBooks.find((book) => book.id === id);
    } else {
      const lastBook = storageBooks[storageBooks.length - 1];
      book = {
        id: lastBook ? lastBook.id + 1 : 1, // Ensure the ID increments
        name: "",
        price: 0,
        rate: 0,
        image: "",
      };
      storageBooks.push(book);
    }
  
    book.name = document.getElementById("edit-name").value;
    book.price = document.getElementById("edit-price").value;
    book.rate = document.getElementById("rate").value;
    let inputValue = document.getElementById("edit-image").value;

    book.image = `assets/${inputValue.replace(/\s+/g, '')}.jpg`;  
    localStorage.setItem("books", JSON.stringify(storageBooks));
  
    renderBooks(storageBooks, currentPage); // Reset to the current page after saving
    generatePaginator(storageBooks); // Regenerate the paginator
    showSuccessMessage("Book saved successfully!");

  };
  
const newBook = () => {
  editInView(null);
};
function loadBooks() {
    localStorage.clear();
    currentPage = 1;

    localStorage.setItem("books", JSON.stringify(Gbooks));

    renderBooks(Gbooks, currentPage);
    generatePaginator(Gbooks); // Regenerate paginator for the original books
}
main();
