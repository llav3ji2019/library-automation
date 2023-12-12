import { Dispatch, SetStateAction, FormEvent } from "react";
import Journal from '../../../types/journal';
import Client from "../../../types/client";
import Book from "../../../types/book";

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

function selectToggle(this: Element): void {
  this.parentElement?.classList.toggle('is-active');
 }

function selectChoose(this: HTMLDivElement): void {
  let select = this.closest('.select') as HTMLDivElement;
  select.classList.remove('is-active');
}

function JournalForm({setActive, setCurrentJournal, currentJournal, clients, books, onAddJournal, onChangeJournal, isJournalUpdateMethod}: JournalFormProps): JSX.Element {
  const handleFieldChange = (evt: FormEvent<HTMLInputElement>) => {
    const {name, value} = evt.currentTarget;
    setCurrentJournal({
      ...currentJournal,
      [name]: value
    })
  }

  let selectHeader = document.querySelectorAll('.select__header');
  let selectItem = document.querySelectorAll('.select__item');

  selectHeader.forEach(item => {
      item.addEventListener('click', selectToggle)
  });

  selectItem.forEach(item => {
      item.addEventListener('click', selectChoose)
  });
  return (
  <div className="journal-form">
    <h2 className="custom-form__title">Journal Form</h2>
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
              });
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
        <input type="date" id="date_beg" name="date_beg" autoComplete="off" value={currentJournal?.date_beg.toLocaleString() ?? ""} onChange={handleFieldChange} />
      </div>
      <div className="custom-form-block">
        <label>End date:</label>
        <input type="date" id="date_end" name="date_end" autoComplete="off" value={currentJournal?.date_end.toLocaleString() ?? ""} onChange={handleFieldChange}/>
      </div>
      <div className="custom-form-block">
        <label>Return date:</label>
        <input type="date" id="date_ret" name="date_ret" autoComplete="off" value={currentJournal?.date_ret?.toLocaleString() ?? ""} onChange={handleFieldChange}/>
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