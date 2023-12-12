import axios from "axios";
import Journal from "../types/journal";
import Book from "../types/book";
import BookType from "../types/book-type";
import Client from "../types/client";
import { Dispatch, SetStateAction } from "react";

export function getAllJournals(setJournalList: Dispatch<SetStateAction<Journal[]>>) {
  axios.get<Journal[]>(
    'http://localhost:8080/library/journal/all',
    {
      headers: {
        Accept: 'application/json',
      },
    },
  ).then(response => {
    setJournalList( response.data );
    return response;
  }).catch((exception) => {
    console.log(exception);
  });
}

export function getAllBooks(setBookList: Dispatch<SetStateAction<Book[]>>) {
  axios.get<Book[]>(
    'http://localhost:8080/library/book/all',
    {
      headers: {
        Accept: 'application/json',
      },
    },
  ).then(response => {
    setBookList( response.data );
    return response;
  }).catch((exception) => {
    console.log(exception);
  });
}

export function getAllBookTypes(setBookTypeList: Dispatch<SetStateAction<BookType[]>>) {
  axios.get<BookType[]>(
    'http://localhost:8080/library/book_type/all',
    {
      headers: {
        Accept: 'application/json',
      },
    },
  ).then(response => {
    setBookTypeList( response.data );
    return response;
  }).catch((exception) => {
    console.log(exception);
  });
}

export function getAllClients(setClientList: Dispatch<SetStateAction<Client[]>>) {
  axios.get<Client[]>(
    'http://localhost:8080/library/client/all',
    {
      headers: {
        Accept: 'application/json',
      },
    },
  ).then(response => {
    setClientList( response.data );
    return response;
  }).catch((exception) => {
    console.log(exception);
  });
}
