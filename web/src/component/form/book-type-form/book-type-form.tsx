import { Dispatch, SetStateAction, FormEvent } from "react";
import BookType from "../../../types/book-type";

type BookTypeFormProps = {
  setActive: Dispatch<SetStateAction<boolean>>;
  setCurrentBookType: Dispatch<SetStateAction<BookType>>;
  currentBookType: BookType;
  onAddBookType: (bookType: BookType) => void;
  onChangeBookType: (bookType: BookType) => void,
  isBookTypeUpdateMethod: boolean
}

function BookTypeForm({setActive, setCurrentBookType, currentBookType, onAddBookType, onChangeBookType, isBookTypeUpdateMethod}: BookTypeFormProps): JSX.Element {
  const handleFieldChange = (evt: FormEvent<HTMLInputElement>) => {
    const {name, value} = evt.currentTarget;
    setCurrentBookType({
      ...currentBookType,
      [name]: value
    })
  }

  return (
  <div className="journal-form">
    <h2 className="custom-form__title">Book Type Form</h2>
    <form>
      <div className="custom-form-block">
        <label>Fine</label>
        <input type="number" id="fine" name="fine" autoComplete="off" value={currentBookType.fine || "Enter fine amount"} onChange={handleFieldChange} />
      </div>
      <div className="custom-form-block">
        <label>Day amount</label>
        <input type="number" id="day_count" name="day_count" autoComplete="off"
        value={currentBookType.day_count || "Enter passport day count"} onChange={handleFieldChange} />
      </div>
      <div className="custom-form-block">
        <label>Type name</label>
        <input type="text" id="type_name" name="type_name" autoComplete="off" defaultValue={currentBookType.name || "Enter book type"}
        onChange={handleFieldChange} />
      </div>
    </form>
    <input type="submit" name="submit" value="Submit"
    onClick={() => {
      if (isBookTypeUpdateMethod) {
        onChangeBookType(currentBookType);
      }
      else {
        onAddBookType(currentBookType);
      }
      setActive(false);
      }
    } />
  </div>
  );
}

export default BookTypeForm;