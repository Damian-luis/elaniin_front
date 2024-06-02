// context/BooksContext.js

import React, { createContext,useState,useEffect } from 'react';
import { getAllBooks } from '@/pages/api/books';
const BooksContext = createContext({
  availableBooks: [],
  setAvailableBooks: () => {}
});

const BooksProvider = ({ children }) => {
  const [availableBooks, setAvailableBooks] = useState([]);

  const fetchAvailableBooks = async () => {
    try {

        const booksData = await getAllBooks();
        if (booksData) {
          //setBooks();
          setAvailableBooks(booksData.books);
        }
      } catch (error) {
        console.log(error)
       //setError(error.message || 'Error fetching books');
      }
    
  };

  useEffect(() => {
    fetchAvailableBooks();
  }, []);

  return (
    <BooksContext.Provider value={{ availableBooks, setAvailableBooks }}>
      {children}
    </BooksContext.Provider>
  );
};

export { BooksContext, BooksProvider };
