import Journal from '../../../../types/journal';
import { Dispatch, SetStateAction } from 'react';
import Book from '../../../../types/book';

type BookFieldProps = {
  setCurrentJournal: Dispatch<SetStateAction<Journal>>,
  currentJournal: Journal,
  books: Book[],
}

function BookField({books, setCurrentJournal, currentJournal} : BookFieldProps):JSX.Element {
  return (
    <div className="custom-form-block">
    <div className="select">
      <div className="select__header">
        <span className="select__current">{currentJournal.book_name || "Book name"}</span>
        <div className="select__icon">&times;</div>
      </div>
    
      <div className="select__body">
      {
        books.map(
          el => (<div className="select__item" onClick={() => {
            setCurrentJournal({
              ...currentJournal,
              book_name: el.name
            })
          }}>
          {el.name}
          </div>
          )
        )
      }
      </div>
    </div>
  </div>
  );
}

export default BookField;