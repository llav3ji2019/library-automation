import { Dispatch, SetStateAction, FormEvent } from "react";
import BookType from '../../../types/book-type';
import Book from "../../../types/book";
import ReactSelect from "react-select";

type BookFormProps = {
  setActive: Dispatch<SetStateAction<boolean>>;
  setCurrentBook: Dispatch<SetStateAction<Book>>,
  currentBook: Book,
  bookTypes: BookType[],
  onAddBook: (book: Book) => void,
  onChangeBook: (book: Book) => void,
  isBookUpdateMethod: boolean
}

type BookTypeOption = {
  value: string,
  label: string
}

function BookForm({setActive, setCurrentBook, currentBook, bookTypes, onAddBook, onChangeBook, isBookUpdateMethod}: BookFormProps): JSX.Element {
  const bookTypesOptions: BookTypeOption[] = [];
  bookTypes.map(el => {
    bookTypesOptions.push({
      value: el.name,
      label: el.name
    })
  });

  const handleFieldChange = (evt: FormEvent<HTMLInputElement>) => {
    const {name, value} = evt.currentTarget;
    setCurrentBook({
      ...currentBook,
      [name]: value
    })
  }

  const getValue = () => {
    return currentBook? bookTypesOptions.find(c => c?.value === currentBook.type_name): ''
  }

  const onSelectChange = (newValue: any) => {
    setCurrentBook({
      ...currentBook,
      type_name: newValue.value
    });
  }

  return (
  <div className="journal-form">
    <h2 className="custom-form__title">Book Form</h2>
    <form>
      <div className="custom-form-block">
          <label>Book type name</label>
          <div className="custom-select">
            <ReactSelect name="book_type" className="basic-single" classNamePrefix="select" defaultInputValue={currentBook.type_name || "Type name"}
              isSearchable={true} onChange={onSelectChange} value={getValue()} options={bookTypesOptions}/>
          </div>
      </div>
      <div className="custom-form-block">
        <label>Book name</label>
        <input type="text" id="name" name="name" autoComplete="off" value={currentBook.name || "Enter book name"} onChange={handleFieldChange} />
      </div>
      <div className="custom-form-block">
        <label>Amount</label>
        <input type="number" id="cnt" name="cnt" autoComplete="off" value={currentBook.cnt || "Enter amount"} onChange={handleFieldChange}/>
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
