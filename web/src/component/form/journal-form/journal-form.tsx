import { Dispatch, SetStateAction, FormEvent } from "react";
import Journal from '../../../types/journal';
import Client from "../../../types/client";
import Book from "../../../types/book";
import ReactSelect from "react-select";
import { getFullName } from "../../../utils/client-utils";

type JournalFormProps = {
  setActive: Dispatch<SetStateAction<boolean>>;
  setCurrentJournal: Dispatch<SetStateAction<Journal>>,
  currentJournal: Journal,
  clients: Client[],
  books: Book[],
  onAddJournal: (journal: Journal) => void,
  onChangeJournal: (journal: Journal) => void,
  isJournalUpdateMethod: boolean
}

type SelectOption = {
  value: string,
  label: string
}

function JournalForm({setActive, setCurrentJournal, currentJournal, clients, books, onAddJournal, onChangeJournal, isJournalUpdateMethod}: JournalFormProps): JSX.Element {
  const bookOptions: SelectOption[] = [];
  books.map(el => {
    bookOptions.push({
      value: el.name,
      label: el.name
    })
  });

  const clientOptions: SelectOption[] = [];
  clients.map(el => {
    const fullName = getFullName(el);
    clientOptions.push({
      value: fullName,
      label: fullName
    })
  });

  const handleFieldChange = (evt: FormEvent<HTMLInputElement>) => {
    const {name, value} = evt.currentTarget;
    setCurrentJournal({
      ...currentJournal,
      [name]: value
    })
  }

  const getClientValue = () => {
    return currentJournal? bookOptions.find(el => el?.value === currentJournal.client_name): ''
  }

  const getBookValue = () => {
    return currentJournal? clientOptions.find(el => el?.value === currentJournal.book_name): ''
  }

  const onClientSelectChange = (newValue: any) => {
    setCurrentJournal({
      ...currentJournal,
      client_name: newValue.value
    });
  }

  const onBookSelectChange = (newValue: any) => {
    setCurrentJournal({
      ...currentJournal,
      book_name: newValue.value
    });
  }

  return (
  <div className="journal-form">
    <h2 className="custom-form__title">Journal Form</h2>
    <form>
      <div className="custom-form-block">
          <label>Client name</label>
          <div className="custom-select">
            <ReactSelect name="client_name" className="basic-single" classNamePrefix="select" defaultInputValue={currentJournal?.client_name ?? "Client name"}
              isSearchable={true} onChange={onClientSelectChange} value={getClientValue()} options={clientOptions}/>
          </div>
      </div>

      <div className="custom-form-block">
          <label>Book name</label>
          <div className="custom-select">
            <ReactSelect name="book_nane" className="basic-single" classNamePrefix="select" defaultInputValue={currentJournal?.book_name ?? "Book name"}
              isSearchable={true} onChange={onBookSelectChange} value={getBookValue()} options={bookOptions}/>
          </div>
      </div>
      
      <div className="custom-form-block">
        <label>Begin date:</label>
        <input type="date" id="date_beg" name="date_beg" autoComplete="off" defaultValue={currentJournal.date_beg.toLocaleString() || ""} onChange={handleFieldChange} />
      </div>
      <div className="custom-form-block">
        <label>End date:</label>
        <input type="date" id="date_end" name="date_end" autoComplete="off" defaultValue={currentJournal.date_end.toLocaleString() || ""} onChange={handleFieldChange}/>
      </div>
      <div className="custom-form-block">
        <label>Return date:</label>
        <input type="date" id="date_ret" name="date_ret" autoComplete="off" defaultValue={currentJournal.date_ret?.toLocaleString() || ""} onChange={handleFieldChange}/>
      </div>
    </form>
    <input type="submit" name="submit" value="Submit"
    onClick={() => {
      setActive(false);
      if (isJournalUpdateMethod) {
        onChangeJournal(currentJournal);
      }
      else {
        onAddJournal(currentJournal);
      }
      }
    } />
  </div>
  );
}

export default JournalForm;
