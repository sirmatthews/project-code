function findAuthorById(authors, id) {
  return authors.find(author => id === author.id);
}

function findBookById(books, id) {
  return books.find(book => book.id === id);
}

function partitionBooksByBorrowedStatus(books) {
  const result = [];
  // if they're returned put them in one array, if not put them in another
  const borrowedBooks = books.filter(book => !book.borrows[0].returned);
  const unborrowedBooks = books.filter(book => book.borrows[0].returned);
  // push the borrowed books then the unborrowed books to the return array
  result.push(borrowedBooks);
  result.push(unborrowedBooks);
  return result;
}


function getBorrowersForBook(book, accounts) {
  const borrows = book.borrows;
  const result = [];
  // loop through borrows array, find borrower, and push formatted results to result array
  borrows.forEach(borrow => {
    // test for a maximum of 10 borrowers in the array
    if (result.length >= 10) return;

    const borrower = accounts.find(account => account.id === borrow.id);
    const formattedBorrow = {
      ...borrow,
      ...borrower,
    };
    result.push(formattedBorrow);
  });
  console.log(result);
  return result;
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
