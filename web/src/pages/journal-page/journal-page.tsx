import Header from '../../component/header/header';
import Footer from '../../component/footer/footer';
import { useState, Dispatch, SetStateAction } from 'react';
import CustomForm from '../../component/form/custom-form';
import JournalForm from '../../component/form/journal-form/journal-form';
import Journal from '../../types/journal';
import axios from 'axios';
import Client from '../../types/client';
import Book from '../../types/book';
import { getFullName } from '../../utils/client-utils';

type JournalPageProps = {
  journals: Journal[],
  clients: Client[],
  books: Book[];
  setJournals: Dispatch<SetStateAction<Journal[]>>
}

function JournalPage({journals, clients, books, setJournals} : JournalPageProps):JSX.Element {
  const defaultJournal = {
    id: 0,
    book_name: "Book name",
    client_name: "Client name",
    date_beg: new Date("2023-01-01"),
    date_end:  new Date("2023-01-01"),
    date_ret:  new Date("2023-01-01")
  }

  const [formActive, setFromActive] = useState(false);
  const [curJournal, setCurrentJournal] = useState<Journal>(defaultJournal);
  const [isJournalUpdateMethod, setIsJournalUpdateMethod] = useState(true);
  
  const handleChangeJournal = (newJournal: Journal) => {
      const request = {
        id: newJournal.id,
        book_id: books.findIndex((book) => book.name === newJournal.book_name) + 1,
        client_id: clients.findIndex((client) => getFullName(client) === newJournal.client_name) + 1,
        date_beg: newJournal.date_beg,
        date_end: newJournal.date_end,
        date_ret: newJournal.date_ret
      }    
          
      axios.put<string>(
        'http://localhost:8080/library/journal/update',
        request,
        {
          headers: {
            Accept: 'application/json',
          },
          timeout: 200,
        },
      ).then(response => {
        const newList = journals.map((item) => {
          if (item.id === newJournal.id) {  
            return newJournal;
          }
          return item;
        }).sort((l, r) => l.id - r.id);

        setJournals(newList);
        return response;
      }).catch((exception) => {
        alert(exception)
      });    
  }

  const handleAddJournal = (newJournal: Journal) => {
    const request = {
      id: journals.length + 2,
      book_id: books.findIndex((book) => book.name === newJournal.book_name) + 1,
      client_id: clients.findIndex((client) => getFullName(client) === newJournal.client_name) + 1,
      date_beg: newJournal.date_beg,
      date_end: newJournal.date_end,
      date_ret: newJournal.date_ret
    }

    axios.post<string>(
      'http://localhost:8080/library/journal/add',
      request,
      {
        headers: {
          Accept: 'application/json',
        },
        timeout: 200,
      },
    ).then(response => {
      const newListElement = {...newJournal, id: request.id};
      setJournals(oldjournals => [...oldjournals, newListElement]);
      // window.location.reload();
      return response;
    }).catch((exception) => {
      alert(exception)
    });
  }

  const handleDeleteJournal = (deletedJournal: Journal) => {
    axios.delete<string>(
      `http://localhost:8080/library/journal/delete/${deletedJournal.id}`
    ).then(response => {
      const newList = journals.filter((item) => {
        item.id !== deletedJournal.id
      }).sort((l, r) => l.id - r.id);
      setJournals(newList);
      // window.location.reload();
      return response;
    }).catch((error) => {
      alert("Книга не была возвращена. Транзакция отменена.");
    });
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
              journals.map((journal) => (
                <tr>
                  <td>{journal.id}</td>
                  <td>{journal.book_name}</td>
                  <td>{journal.client_name}</td>
                  <td>{journal.date_beg.toLocaleString()}</td>
                  <td>{journal.date_end.toLocaleString()}</td>
                  <td>{journal.date_ret?.toLocaleString() ?? ""}</td>
                  <td className="td__edit-action">
                    <img src="../img/edit-icon.svg" alt="edit" width="32px" height="32px"
                    onClick = {
                      () => {
                        setIsJournalUpdateMethod(true);
                        setCurrentJournal(journal);
                        setFromActive(true);
                        }
                      }/>
                  </td>
                  <td className="td__remove-action" onClick = {
                      () => {
                        setCurrentJournal(journal);
                        handleDeleteJournal(journal);
                        }
                      }>
                    <img src="../img/remove-icon.svg" alt="remove" width="32px" height="32px" />
                  </td>
                </tr>
              ))              
            }
            
          </table>
          <button type="submit" className="btn-add-row" onClick={() => {
            setIsJournalUpdateMethod(false);
            setFromActive(true);
            }}>Add value</button>
          <CustomForm active = {formActive} setActive={setFromActive} children={<JournalForm books={books} clients={clients}
          currentJournal={curJournal} setCurrentJournal={setCurrentJournal} setActive={setFromActive} onAddJournal={handleAddJournal}
          onChangeJournal= {handleChangeJournal} isJournalUpdateMethod = {isJournalUpdateMethod}/>} />
      </section>
      <Footer />
    </>
  );
}

export default JournalPage;
