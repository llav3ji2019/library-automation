import { Dispatch, SetStateAction } from "react";
import { TableStatus } from '../../const';
import Book from "../../types/book";
import BookType from '../../types/book-type';
import Client from "../../types/client";

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
  if (tableStatus === TableStatus.CLIENT_STATE) {
    return (
      <>
        <tr>
          <td>Id</td>
          <td>First name</td>
          <td>Last name</td>
          <td>Father name</td>
          <td>Pasport seria</td>
          <td>Pasport number</td>
          <td colSpan={2}>Actions</td>
        </tr>
        {
            clients.map((client) => (
              <tr>
                <td>{client.id}</td>
                <td>{client.first_name}</td>
                <td>{client.last_name}</td>
                <td>{client.father_name}</td>
                <td>{client.passport_seria}</td>
                <td>{client.passport_num}</td>
                <td className="td__edit-action" onClick={() => {
                  setIsClientUpdateMethod(true);
                  setCurrentClient(client);
                  setFormActive(true);
                }}>
                  <img src="../img/edit-icon.svg" alt="edit" width="32px" height="32px" />
                </td>
                <td className="td__remove-action" onClick = {
                      () => {
                        setCurrentClient(client);
                        handleDeleteClient(client);
                        }
                      }>
                  <img src="../img/remove-icon.svg" alt="remove" width="32px" height="32px" />
                </td>
              </tr>
            ))
          }
      </>
    );
  } else if (tableStatus === TableStatus.BOOK_STATE) {
    return (
      <>
        <tr>
          <td>Id</td>
          <td>Name</td>
          <td>Left amount</td>
          <td>Type name</td>
          <td colSpan={2}>Actions</td>
        </tr>
        {
            books.map((book) => (
              <tr>
                <td>{book.id}</td>
                <td>{book.name}</td>
                <td>{book.cnt}</td>
                <td>{book.type_name}</td>
                <td className="td__edit-action" onClick={() => {
                  setIsBookUpdateMethod(true);
                  setCurrentBook(book);
                  setFormActive(true);
                }}>
                  <img src="../img/edit-icon.svg" alt="edit" width="32px" height="32px" />
                </td>
                <td className="td__remove-action" onClick = {
                      () => {
                        setCurrentBook(book);
                        handleDeleteBook(book);
                        }
                      }>
                  <img src="../img/remove-icon.svg" alt="remove" width="32px" height="32px" />
                </td>
              </tr>
            ))
        }
      </>
  
    );
  } else {
    
    return (
      <>
        <tr>
          <td>Id</td>
          <td>Name</td>
          <td>Fine</td>
          <td>Day count</td>
          <td colSpan={2}>Actions</td>
        </tr>
      {
          booksType.map((type) => (
            <tr>
              <td>{type.id}</td>
              <td>{type.name}</td>
              <td>{type.fine}</td>
              <td>{type.day_count}</td>
              <td className="td__edit-action" onClick={() => {
                  setIsBookTypeUpdateMethod(true);
                  setCurrentBookType(type);
                  setFormActive(true);
                }}>
                <img src="../img/edit-icon.svg" alt="edit" width="32px" height="32px" />
              </td>
              <td className="td__remove-action" onClick = {
                      () => {
                        setCurrentBookType(type);
                        handleDeleteBookType(type);
                        }
                      }>
                <img src="../img/remove-icon.svg" alt="remove" width="32px" height="32px" />
              </td>
            </tr>
          ))
      }
    </>
    );
  }
}

export default HandbookTable;
