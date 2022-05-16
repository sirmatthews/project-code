function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  let total = 0;
  books.forEach((book) => {
    if (!book.borrows[0].returned) {
      total++;
    }
  });

  return total;
}

function getMostCommonGenres(books) {
  // create new array of most common genres with reduce()
  const result = books.reduce((accum, book) => {
    // get the genre of current book
    const genre = book.genre;

    // get the object in accum that has "name === genre"
    const genreInfo = accum.find((element) => element.name === genre);

    // if an object was not found, create a new one and push it into accum
    if (!genreInfo) {
      const newGenreInfo = {
        name: genre,
        count: 1,
      };
      accum.push(newGenreInfo);
    } else {
      // if object was found, then add 1 to count
      genreInfo.count++;
    }

    return accum;
  }, []);

  // sort the array by count from greatest to least
  result.sort((genreA, genreB) => genreB.count - genreA.count);

  // limit array to 5
  result.splice(5);

  return result;
}

function getMostPopularBooks(books) {
  // create an new array of most popular books with map
  const result = books.map((book) => {
    const popularityInfo = {
      name: book.title,
      count: book.borrows.length,
    };

    return popularityInfo;
  });

  // sort the new array by count: greatest to least
  result.sort((titleA, titleB) => titleB.count - titleA.count);

  // limit to 5 elements
  result.splice(5);

  return result;
}

function getMostPopularAuthors(books, authors) {
  const authorList = [];
  const countList = [];
  const authorIdList = [];

  authors.forEach(author => {
    
    // test for authors being listed multiple times
    if (!authorIdList.includes(author.id)) {
    authorIdList.push(author.id);
    
    // make formatted list of author names
    authorList.push(`${author.name.first} ${author.name.last}`);
    
    // make list of author books, count borrows for each book
    const authorBooks = books.filter(book => book.authorId === author.id);
    const authorBooksBorrows = authorBooks.map(book => book.borrows.length);
    
    // reduce array of borrows for each author book to a single number for all an author's borrows
    // add it it a countList that corresponds with the authorList
    countList.push(authorBooksBorrows.reduce((acc, count) => acc + count));
    }
  });
  
  return makeSortedTopFiveNameCountArray(authorList, countList);
}

// HELPER FUNCTIONS

// a function to list all genres in a given array of books

function getAllGenres (books) {
  const genres = [];
  books.forEach(book => {
    
    // test for a genre being listed multiple times
    if (!genres.includes(book.genre)) genres.push(book.genre);
  });
  return genres;
}

function makeNameAndCountArray (nameList, countList) {
  const result = nameList.reduce((acc, desc, index) => {
    acc.push({name: desc, count: countList[index]});
    return acc;
  }, []);
  return result;
}

// puts an array of name / count objects into order from highest to lowest count
// parameters:
  // an array of name / count objects
// returns:
  // the sorted parameter array
function orderByCount (nameCount) {
  return nameCount.sort((placeA, placeB) => (placeB.count - placeA.count));
}


function topFive (list) {
  while (list.length > 5) {
    list.pop();
  }
  return list;
}

function makeSortedTopFiveNameCountArray (nameList, countList)
{
  const result = makeNameAndCountArray(nameList, countList);
  orderByCount(result);
  return topFive(result);
}
module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
