import { Dispatch, SetStateAction, useState } from "react";
import Journal from '../../../types/journal';
import Client from "../../../types/client";
import Book from "../../../types/book";

type JournalFormProps = {
  setActive: Dispatch<SetStateAction<boolean>>;
  setCurrentJournal: Dispatch<SetStateAction<Journal>>,
  currentJournal: Journal,
  clients: Client[],
  books: Book[],
  onHandleJournal: (journal: Journal) => void
}

function JournalForm({setActive, setCurrentJournal, currentJournal, clients, books, onHandleJournal}: JournalFormProps): JSX.Element {
  return (
  <div className="journal-form">
    <h2 className="custom-form__title">Login</h2>
    <form>
    <div className="custom-form-block">
        <div className="select">
          <div className="select__header">
            <span className="select__current">{currentJournal?.client_name ?? "Client name"}</span>
            <div className="select__icon">&times;</div>
          </div>
          <div className="select__body">
          {
            clients.map(el => (
            <div className="select__item" 
            onClick={() => {
              setCurrentJournal({
                ...currentJournal,
                client_name: el.last_name + " " + el.first_name + " " + el.father_name
              })
            }}>
              {el.last_name + " " + el.first_name + " " + el.father_name}
            </div>))
          }
          </div>
        </div>
      </div>
      <div className="custom-form-block">
        <div className="select">
          <div className="select__header">
            <span className="select__current">{currentJournal?.book_name ?? "Book name"}</span>
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
      <div className="custom-form-block">
        <label>Begin date:</label>
        <input type="date" id="birthday" name="birthday" autoComplete="off" value={currentJournal.date_beg.toLocaleString()} />
      </div>
      <div className="custom-form-block">
        <label>End date:</label>
        <input type="date" id="birthday" name="birthday" autoComplete="off" value={currentJournal.date_end.toLocaleString()}/>
      </div>
      <div className="custom-form-block">
        <label>Return date:</label>
        <input type="date" id="birthday" name="birthday" autoComplete="off" value={currentJournal.date_ret?.toLocaleString() ?? ""}/>
      </div>
    </form>
    <input type="submit" name="submit" value="Submit"
    onClick={() => {
      setActive(false);
      onHandleJournal(currentJournal);
      }
    } />
  </div>
  );
}

export default JournalForm;