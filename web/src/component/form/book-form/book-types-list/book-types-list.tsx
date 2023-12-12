import BookType from "../../../../types/book-type";
import Book from "../../../../types/book";
import { Dispatch, SetStateAction } from "react";

type BookTypesListProps = {
  bookTypes: BookType[],
  currentBook: Book,
  setCurrentBook: Dispatch<SetStateAction<Book>>,
}

function BookTypesList({bookTypes, currentBook, setCurrentBook} : BookTypesListProps):JSX.Element {
  return (
    <div className="select__body">
      {
        bookTypes.map(el => (
        <div className="select__item" 
        onClick={() => {
          setCurrentBook({
            ...currentBook,
            type_name: el.name
          });
        }}>
          {el.name}
        </div>))
      }
    </div>
  );
}

export default BookTypesList;