import { Dispatch, SetStateAction } from "react";
import Journal from "../../../types/journal";
import Client from "../../../types/client";
import Book from "../../../types/book";

type JournalFormProps = {
  setActive: Dispatch<SetStateAction<boolean>>;
  journal: Journal,
  clients: Client[],
  books: Book[]
}

function JournalForm({setActive, journal, clients, books}: JournalFormProps): JSX.Element {
  return (
  <div className="journal-form">
    <h2 className="custom-form__title">Login</h2>
    <form>
    <div className="custom-form-block">
        <div className="select">
          <div className="select__header">
            <span className="select__current">{journal?.client_name ?? "Client name"}</span>
            <div className="select__icon">&times;</div>
          </div>
          <div className="select__body">
          {
            clients.map(el => (<div className="select__item">{el.last_name + " " + el.first_name + " " + el.father_name}</div>))
          }
          </div>
        </div>
      </div>
      <div className="custom-form-block">
        <div className="select">
          <div className="select__header">
            <span className="select__current">{journal?.book_name ?? "Book name"}</span>
            <div className="select__icon">&times;</div>
          </div>
        
          <div className="select__body">
          {
            books.map(el => (<div className="select__item">{el.name}</div>))
          }
          </div>
        </div>
      </div>
      <div className="custom-form-block">
        <label>Begin date:</label>
        <input type="date" id="birthday" name="birthday" autoComplete="off" value={journal.date_beg.toLocaleString()} />
      </div>
      <div className="custom-form-block">
        <label>End date:</label>
        <input type="date" id="birthday" name="birthday" autoComplete="off" value={journal.date_end.toLocaleString()}/>
      </div>
      <div className="custom-form-block">
        <label>Return date:</label>
        <input type="date" id="birthday" name="birthday" autoComplete="off" value={journal.date_ret.toLocaleString()}/>
      </div>
    </form>
    <input type="submit" name="submit" value="Submit" onClick={() => setActive(false)} />
  </div>
  );
}

export default JournalForm;