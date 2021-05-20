//reloading the function
showBooks();
//Add a scroll bar to the view

let tableBody = document.getElementById("table");
tableBody.style.overflow = "auto";
tableBody.style.height = "250px";

//book constructor
class Book {
  constructor(name, author, type) {
    this.name = name;
    this.author = author;
    this.type = type;
  }
}

//empty display constructor
class Display {
  constructor() {}
  //add methods to display prototypes
  //adding book to the json data object
  add(book) {
    let getBooks = localStorage.getItem("books");
    let bookObj;
    if (getBooks == null) {
      bookObj = [];
    } else {
      bookObj = JSON.parse(getBooks);
    }

    bookObj.push(book);
    localStorage.setItem("books", JSON.stringify(bookObj));
    showBooks();
  }
  //it will reset the form display
  clear() {
    let libraryForm = document.getElementById("libraryForm");
    libraryForm.reset();
    //reset() function resets the form
  }
  // Implement the validate function
  validate(book) {
    if (book.name.length < 2 || book.author.length < 2) {
      return false;
    } else {
      return true;
    }
  }

  //function to display show message
  show(type, displayMessage) {
    let message = document.getElementById("message");
    message.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
                            <strong>Message:</strong> ${displayMessage}
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">×</span>
                            </button>
                        </div>`;
    setTimeout(function () {
      message.innerHTML = "";
    }, 3000);
  }
}

// Show Books in the table
function showBooks() {
  let getBooks = localStorage.getItem("books");
  let bookObj;
  if (getBooks == null) {
    bookObj = [];
  } else {
    bookObj = JSON.parse(getBooks);
  }

  let addRow = "";
  bookObj.forEach(function (element, index) {
    addRow += `<tr>
                    <td>${element.name}</td>
                    <td>${element.author}</td>
                    <td>${element.type}</td>
                    <td><button id="${index}" onclick="deleteBook(this.id)" class="btn btn-primary">Delete Book</button></td>
                  </tr>`;
  });
  let tableBody = document.getElementById("tableBody");
  if (bookObj.length == 0) {
    tableBody.innerHTML = "";
  } else {
    tableBody.innerHTML = addRow;
  }
}
// Delete Book from the table
function deleteBook(index) {
  let getBooks = localStorage.getItem("books");
  let bookObj;
  if (getBooks == null) {
    bookObj = [];
  } else {
    bookObj = JSON.parse(getBooks);
  }
  let bookName = bookObj[index].name;
  bookObj.splice(index, 1);
  localStorage.setItem("books", JSON.stringify(bookObj));
  let message = document.getElementById("message");
  let boldText = "Deleted";
  message.innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                            <strong>${boldText}: </strong> The book ${bookName} has been deleted from the library
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">×</span>
                            </button>
                        </div>`;
  setTimeout(() => {
    message.innerHTML = "";
  }, 3000);
  showBooks();
}

//add submit event listener to form
let libraryform = document.getElementById("libraryForm");
libraryform.addEventListener("submit", libraryFormSubmit);

function libraryFormSubmit(e) {
  console.log("form submitted");
  e.preventDefault();
  let name = document.getElementById("bookName").value;

  let author = document.getElementById("author").value;

  let fiction = document.getElementById("fiction");

  let programming = document.getElementById("programming");

  let cooking = document.getElementById("cooking");

  let mentalHealth = document.getElementById("mentalHealth");

  let other = document.getElementById("Other");

  let type;

  if (fiction.checked) {
    type = fiction.value;
  } else if (programming.checked) {
    type = programming.value;
  } else if (cooking.checked) {
    type = cooking.value;
  } else if (mentalHealth.checked) {
    type = mentalHealth.value;
  } else if (other.checked) {
    type = other.value;
  }

  let book = new Book(name, author, type);
  console.log(book);

  let display = new Display();

  if (display.validate(book)) {
    display.add(book);
    display.clear();
    display.show("success", "your book has been successfully added");
  } else {
    display.show("danger", "please fill the required fields correctly");
  }
}
