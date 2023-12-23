import { Dispatch, SetStateAction } from "react";
import Book from "../../types/book";

type BookTableProps = {
  books: Book[],
  setFormActive: Dispatch<SetStateAction<boolean>>,
  setIsBookUpdateMethod: Dispatch<SetStateAction<boolean>>,
  setCurrentBook: Dispatch<SetStateAction<Book>>,
  handleDeleteBook: (newBook: Book) => void,
}

function BookTable({books, setCurrentBook, setFormActive, setIsBookUpdateMethod, handleDeleteBook }: BookTableProps): JSX.Element {
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
}

export default BookTable;