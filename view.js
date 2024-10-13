let currentPage = 1; // To track the current page
const booksPerPage = 5; // Number of books per page (change as needed)

function generatePaginator(books) {
  const paginatorDiv = document.getElementById("paginator");
  paginatorDiv.innerHTML = ""; // Clear previous paginator

  const totalPages = Math.ceil(books.length / booksPerPage); // Total number of pages

  // Previous button
  const prevButton = document.createElement("button");
  prevButton.innerText = "Previous";
  prevButton.disabled = currentPage === 1; // Disable if on the first page
  prevButton.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      renderBooks(books, currentPage);
      generatePaginator(books); // Regenerate paginator to update button states
    }
  });
  paginatorDiv.appendChild(prevButton);

  // Page buttons
  for (let i = 1; i <= totalPages; i++) {
    const button = document.createElement("button");
    button.innerText = i;

    if (i === currentPage) {
      button.classList.add("active"); // Highlight the current page button
    }

    button.addEventListener("click", () => {
      currentPage = i;
      renderBooks(books, currentPage);
      generatePaginator(books); // Regenerate paginator to update button states
    });

    paginatorDiv.appendChild(button);
  }

  // Next button
  const nextButton = document.createElement("button");
  nextButton.innerText = "Next";
  nextButton.disabled = currentPage === totalPages; // Disable if on the last page
  nextButton.addEventListener("click", () => {
    if (currentPage < totalPages) {
      currentPage++;
      renderBooks(books, currentPage);
      generatePaginator(books); // Regenerate paginator to update button states
    }
  });
  paginatorDiv.appendChild(nextButton);
}

const renderBooks = (books, page) => {
    // Define how many books per page
    const startIndex = (page - 1) * booksPerPage;
    const endIndex = page * booksPerPage;
  
    const items = document.getElementById("items");
    items.innerHTML = ""; // Clear current items
  
    books.slice(startIndex, endIndex).forEach((book) => {
      items.innerHTML += getBook(book);
    });
    highlightCurrentPage(currentPage); // Call with the current page
  };

const getBook = (book) => {
  return `
    <div class = "book">
    <p class="id">${book.id}</p>
    <p class="ptitle">${book.name}</p>
    <p class="price"> ₪${book.price}</p>
     <div class="buttons">   
    <button class="read" onclick="readBook(${book.id})">read</button>
    <button class="edit" onclick="edit(${book.id})">edit</button>
    <button class="delete" onclick="deleteBook(${book.id})">Delete</button>
</div>
    </div>`;
};
const renderReadBook = (book) => {
  var sidebar = document.getElementById("side-bar");
  sidebar.innerHTML = ""; // Clear previous sidebar content
  sidebar.innerHTML = `
        <div class="read-book">
            <h1>${book.name}</h1>
            <p>Price: ₪${book.price}</p>
            <h2 id=rate-text>Rate: ${book.rate}</h2>
            <input type="number" id="rate" placeholder="Enter rate">
            <button onclick="addRate(${book.id})">Add rate</button>
            <img src="${book.image}" alt="Read-Book">
        </div>`;
};
const clearSideBar = () => {
  var sidebar = document.getElementById("side-bar");
  sidebar.innerHTML = "choose book";
};

function highlightCurrentPage(currentPage) {
    const buttons = document.querySelectorAll("#paginator button");
  
    buttons.forEach((button, index) => {
      if (index + 1 === currentPage) {
        button.style.backgroundColor = "lightblue"; // Highlight current page
      } else {
        button.style.backgroundColor = ""; // Reset other buttons
      }
    });
};
const editInView = (book) => {
  var sidebar = document.getElementById("side-bar");
  sidebar.innerHTML = `
        <div class="edit-book">
            <h1>Edit Book</h1>
            <input type="text" id="edit-name" placeholder="Enter name" value="${
              book ? book.name : ""
            }">
            <input type="number" id="edit-price" placeholder="Enter price" value="${
              book ? book.price : 0
            }">
            <input type="number" id="rate" placeholder="Enter rate" value="${
              book ? book.right : 0
            }>
            <input type="text" id="edit-image" placeholder="Enter image URL" value="${
              book ? book.image : ""
            }">
            <input type="text" id="edit-image" placeholder="Enter image URL" value="${
              book ? book.image : ""
            }">
            <button onclick="saveChanges(${
                book ? book.id : null})">Save changes</button>
        </div>;`
};
const showSuccessMessage = (message) => {
    const sidebar = document.getElementById("side-bar");
    sidebar.innerHTML = `<div class="success-message">${message}</div>`;

    // Optionally clear the message after a few seconds
    setTimeout(() => {
        sidebar.innerHTML = "choose book"; // Reset sidebar content after a delay
    }, 3000);
};