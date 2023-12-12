import { Dispatch, SetStateAction, FormEvent } from "react";
import BookType from '../../../types/book-type';
import Book from "../../../types/book";
import { addListenersToDropDownList } from "../../custom-drop-down-list/listeners";

type BookFormProps = {
  setActive: Dispatch<SetStateAction<boolean>>;
  setCurrentBook: Dispatch<SetStateAction<Book>>,
  currentBook: Book,
  bookTypes: BookType[],
  onAddBook: (book: Book) => void,
  onChangeBook: (book: Book) => void,
  isBookUpdateMethod: boolean
}

function BookForm({setActive, setCurrentBook, currentBook, bookTypes, onAddBook, onChangeBook, isBookUpdateMethod}: BookFormProps): JSX.Element {
  const handleFieldChange = (evt: FormEvent<HTMLInputElement>) => {
    const {name, value} = evt.currentTarget;
    setCurrentBook({
      ...currentBook,
      [name]: value
    })
  }
  addListenersToDropDownList(document);

  return (
  <div className="journal-form">
    <h2 className="custom-form__title">Book Form</h2>
    <form>
    <div className="custom-form-block">
        <div className="select">
          <div className="select__header">
            <span className="select__current">{currentBook?.type_name ?? "Type name"}</span>
            <div className="select__icon">&times;</div>
          </div>
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
        </div>
      </div>
      <div className="custom-form-block">
        <label>Book name</label>
        <input type="text" id="name" name="name" autoComplete="off" value={currentBook?.name ?? "Enter book name"} onChange={handleFieldChange} />
      </div>
      <div className="custom-form-block">
        <label>Amount</label>
        <input type="number" id="cnt" name="cnt" autoComplete="off" value={currentBook?.cnt ?? "Enter amount"} onChange={handleFieldChange}/>
      </div>
    </form>
    <input type="submit" name="submit" value="Submit"
    onClick={() => {
      setActive(false);
      if (isBookUpdateMethod) {
        onChangeBook(currentBook);
      }
      else {
        onAddBook(currentBook);
      }
      }
    } />
  </div>
  );
}

export default BookForm;