import { TableStatus } from "../../pages/handbook-page/handbook-page";
import Book from "../../types/book";
import BookType from '../../types/book-type';
import Client from "../../types/client";

type HandbookTableProps = {
  tableStatus: TableStatus,
  books: Book[],
  clients: Client[],
  booksType: BookType[]
}


function HandbookTable({tableStatus, books, booksType, clients}: HandbookTableProps): JSX.Element {
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
                <td className="td__edit-action">
                  <img src="../img/edit-icon.svg" alt="edit" width="32px" height="32px" />
                </td>
                <td className="td__remove-action">
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
                <td className="td__edit-action">
                  <img src="../img/edit-icon.svg" alt="edit" width="32px" height="32px" />
                </td>
                <td className="td__remove-action">
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
              <td className="td__edit-action">
                <img src="../img/edit-icon.svg" alt="edit" width="32px" height="32px" />
              </td>
              <td className="td__remove-action">
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
