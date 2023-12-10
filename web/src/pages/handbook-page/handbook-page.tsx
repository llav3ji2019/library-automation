import Header from '../../component/header/header';
import Footer from '../../component/footer/footer';
import { useState } from 'react';
import CustomForm from '../../component/form/custom-form';
import BookType from '../../types/book-type';
import Client from '../../types/client';
import Book from '../../types/book';
import HandbookTable from '../../component/handbook-table/handbook-table';

function selectToggle(this: Element): void {
  this.parentElement?.classList.toggle('is-active');
 }

function selectChoose(this: HTMLDivElement): void {
  let text = this.innerText,
      select = this.closest('.select') as HTMLDivElement,
      currentText = select.querySelector('.select__current') as HTMLDivElement;
  currentText.innerText = text;
  select.classList.remove('is-active');
}

type HandbookPageProps = {
  books: Book[]
  clients: Client[]
  booksType: BookType[]
}

export enum TableStatus {
  CLIENT_STATE,
  BOOK_STATE,
  BOOK_TYPE_STATE
}

function HandbookPage({books, clients, booksType}: HandbookPageProps): JSX.Element {
  
  const [tableState, setTableState] = useState(TableStatus.CLIENT_STATE);
  const [formActive, setFromActive] = useState(false);
  let selectHeader = document.querySelectorAll('.select__header');
  let selectItem = document.querySelectorAll('.select__item');

  selectHeader.forEach(item => {
      item.addEventListener('click', selectToggle)
  });

  selectItem.forEach(item => {
      item.addEventListener('click', selectChoose)
  });


  return(
    <>
      <Header />
      <section className="section">
        <div className="section__choose-schema">
          <div className="section__switcher-of-schema" role="radiogroup">
              <label>
                  <input className="section__radio-button" type="radio" name="switcher" value="Client" role="radio" checked
                  onClick={() => setTableState(TableStatus.CLIENT_STATE)}/>
                  <span className="section__radio-button-text">Client</span>
              </label>
          </div>
          <div className="section__switcher-of-schema">
              <label>
                  <input className="section__radio-button" type="radio" name="switcher" value="Book" role="radio" onClick={() => setTableState(TableStatus.BOOK_STATE)}/>
                  <span className="section__radio-button-text">Book</span>
              </label>
          </div>
          <div className="section__switcher-of-schema">
              <label>
                  <input className="section__radio-button" type="radio" name="switcher" value="Book type" role="radio" onClick={() => setTableState(TableStatus.BOOK_TYPE_STATE)}/>
                  <span className="section__radio-button-text">Book type</span>
              </label>
          </div>
        </div>

        <table>
          {
            <HandbookTable books={books} tableStatus={tableState} booksType={booksType} clients={clients}/>
          }
        </table>
        <button type="submit" className="btn-add-row" onClick={() => setFromActive(true)}>Add value</button>
        {/* <CustomForm active = {formActive} setActive={setFromActive} children={<JournalForm journal={} setActive={setFromActive}/>} /> */}
      </section>
      <Footer />
    </>
  );
}

export default HandbookPage;
