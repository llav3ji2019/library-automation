import { Dispatch, SetStateAction, FormEvent, useEffect } from "react";
import Journal from '../../../types/journal';
import Client from "../../../types/client";
import Book from "../../../types/book";
import { addListenersToDropDownList } from "../../custom-drop-down-list/listeners";
import BookField from "./book-field/book-field";
import ClientField from "./client-field/client-field";

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

function JournalForm({setActive, setCurrentJournal, currentJournal, clients, books, onAddJournal, onChangeJournal, isJournalUpdateMethod}: JournalFormProps): JSX.Element {
  const handleFieldChange = (evt: FormEvent<HTMLInputElement>) => {
    const {name, value} = evt.currentTarget;
    setCurrentJournal({
      ...currentJournal,
      [name]: value
    })
  }

  useEffect(() => {
    addListenersToDropDownList(document);
  }, []);

  return (
  <div className="journal-form">
    <h2 className="custom-form__title">Journal Form</h2>
    <form>
      <ClientField setCurrentJournal={setCurrentJournal} currentJournal={currentJournal} clients={clients} />

      <BookField setCurrentJournal={setCurrentJournal} currentJournal={currentJournal} books={books} />
      
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
