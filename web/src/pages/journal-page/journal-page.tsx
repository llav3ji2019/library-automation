import Header from '../../component/header/header';
import Footer from '../../component/footer/footer';
import { useState } from 'react';
import CustomForm from '../../component/form/custom-form';
import JournalForm from '../../component/form/journal-form/journal-form';
import Journal from '../../types/journal';
import axios from 'axios';
import Client from '../../types/client';
import Book from '../../types/book';

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

type JournalPageProps = {
  journals: Journal[],
  clients: Client[],
  books: Book[]
}

function JournalPage({journals, clients, books} : JournalPageProps):JSX.Element {
  const defaultJournal = {
    id: 0,
    book_name: "Book name",
    client_name: "Client name",
    date_beg: new Date("2023-01-01"),
    date_end:  new Date("2023-01-01"),
    date_ret:  new Date("2023-01-01")
  }
  const [formActive, setFromActive] = useState(false);
  const [journalList, setJournalList] = useState(journals);
  const [curJournal, setCurrentJournal] = useState(defaultJournal);
  
  let selectHeader = document.querySelectorAll('.select__header');
    let selectItem = document.querySelectorAll('.select__item');
  
    selectHeader.forEach(item => {
        item.addEventListener('click', selectToggle)
    });
  
    selectItem.forEach(item => {
        item.addEventListener('click', selectChoose)
    });

    const handleChangeJournal = (newJournal: Journal) => {
      console.log(newJournal.client_name);
      const newList = journalList.map((item) => {
        if (item.id === newJournal.id) {  
          return newJournal;
        }
        return item;
      });
      setJournalList(newList);
    }

  return (
    <>
      <Header />
      <section className="section">
          <table>
            <tr>
              <td>Id</td>
              <td>Book Name</td>
              <td>Client name</td>
              <td>Date begin</td>
              <td>Date end</td>
              <td>Date return</td>
              <td >Actions</td>
              <td colSpan={2}>Actions</td>
            </tr>

            {
              journalList.map((journal) => (
                <tr>
                  <td>{journal.id}</td>
                  <td>{journal.book_name}</td>
                  <td>{journal.client_name}</td>
                  <td>{journal.date_beg.toLocaleString()}</td>
                  <td>{journal.date_end.toLocaleString()}</td>
                  <td>{journal.date_end.toLocaleString()}</td>
                  <td className="td__edit-action">
                    <img src="../img/edit-icon.svg" alt="edit" width="32px" height="32px"
                    onClick = {
                      () => {
                        setCurrentJournal(journal)
                        setFromActive(true)
                        }
                      }/>
                  </td>
                  <td className="td__remove-action">
                    <img src="../img/remove-icon.svg" alt="remove" width="32px" height="32px" />
                  </td>
                </tr>
              ))              
            }
            
          </table>
          <button type="submit" className="btn-add-row" onClick={() => setFromActive(true)}>Add value</button>
          <CustomForm active = {formActive} setActive={setFromActive} children={<JournalForm books={books} clients={clients}
          currentJournal={curJournal} setCurrentJournal={setCurrentJournal} setActive={setFromActive} onHandleJournal={handleChangeJournal}/>} />
      </section>
      <Footer />
    </>
  );
}

export default JournalPage;
