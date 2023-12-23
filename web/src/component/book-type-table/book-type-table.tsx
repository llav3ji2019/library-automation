import { Dispatch, SetStateAction } from "react";
import BookType from '../../types/book-type';

type BookTypeTableProps = {
  booksType: BookType[],
  setFormActive: Dispatch<SetStateAction<boolean>>,
  setIsBookTypeUpdateMethod: Dispatch<SetStateAction<boolean>>;
  setCurrentBookType: Dispatch<SetStateAction<BookType>>,
  handleDeleteBookType: (newBookType: BookType) => void,
}

function BookTypeTable({booksType, setCurrentBookType, setFormActive, setIsBookTypeUpdateMethod, handleDeleteBookType }: BookTypeTableProps): JSX.Element {
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

export default BookTypeTable;
