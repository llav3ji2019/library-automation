import { Dispatch, SetStateAction } from "react";
import { TableStatus } from '../../const';
import Book from "../../types/book";
import BookType from '../../types/book-type';
import Client from "../../types/client";
import ClientTable from "../client-table/client-table";
import BookTable from "../book-table/book-table";
import BookTypeTable from "../book-type-table/book-type-table";

type HandbookTableProps = {
  tableStatus: TableStatus,
  books: Book[],
  clients: Client[],
  booksType: BookType[],
  setFormActive: Dispatch<SetStateAction<boolean>>,
  setIsBookUpdateMethod: Dispatch<SetStateAction<boolean>>,
  setIsClientUpdateMethod: Dispatch<SetStateAction<boolean>>,
  setIsBookTypeUpdateMethod: Dispatch<SetStateAction<boolean>>;
  setCurrentBook: Dispatch<SetStateAction<Book>>,
  setCurrentBookType: Dispatch<SetStateAction<BookType>>,
  setCurrentClient: Dispatch<SetStateAction<Client>>,
  handleDeleteClient: (newClient: Client) => void,
  handleDeleteBookType: (newBookType: BookType) => void,
  handleDeleteBook: (newBook: Book) => void,
}

function HandbookTable({tableStatus, books, booksType, clients, setCurrentBook, setCurrentBookType, setCurrentClient, setFormActive, setIsBookUpdateMethod, setIsBookTypeUpdateMethod, setIsClientUpdateMethod, handleDeleteClient, handleDeleteBook, handleDeleteBookType }: HandbookTableProps): JSX.Element {
  switch (tableStatus) {
    case TableStatus.BOOK_STATE:
      return <BookTable books={books} setCurrentBook={setCurrentBook} setIsBookUpdateMethod={setIsBookUpdateMethod} handleDeleteBook={handleDeleteBook}
      setFormActive={setFormActive}/>;
    case TableStatus.BOOK_STATE:
      return <BookTypeTable booksType={booksType} setCurrentBookType={setCurrentBookType} handleDeleteBookType={handleDeleteBookType}
        setIsBookTypeUpdateMethod={setIsBookTypeUpdateMethod} setFormActive={setFormActive}/>;
  }
  return <ClientTable setCurrentClient={setCurrentClient} clients={clients} setIsClientUpdateMethod={setIsClientUpdateMethod} handleDeleteClient={handleDeleteClient} setFormActive={setFormActive}/>;
}

export default HandbookTable;
