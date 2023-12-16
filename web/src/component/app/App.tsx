import {BrowserRouter, Route, Routes} from 'react-router-dom';
import IndexPage from '../../pages/index/index-page';
import { AppRoute } from '../../const';
import JournalPage from '../../pages/journal-page/journal-page';
import LoginPage from '../../pages/login-page/login-page';
import HandbookPage from '../../pages/handbook-page/handbook-page';
import Error404 from '../../pages/error-404/error-404';
import { useState } from 'react';
import Journal from '../../types/journal';
import Book from '../../types/book';
import BookType from '../../types/book-type';
import Client from '../../types/client';
import { getAllBookTypes, getAllBooks, getAllClients, getAllJournals } from '../../http-requests/http-requests';
import ReportPage from '../../pages/report-page/report-page';

function App(): JSX.Element {

  const [journalList, setJournalList] = useState<Journal[]>([]);
  const [booklList, setBookList] = useState<Book[]>([]);
  const [bookTypeList, setBookTypeList] = useState<BookType[]>([]);
  const [clientList, setClientList] = useState<Client[]>([]);
  const [shouldSend, setShouldSend] = useState<boolean>(false);

  if (!shouldSend) {
    getAllJournals(setJournalList);
    getAllClients(setClientList);
    getAllBooks(setBookList);
    getAllBookTypes(setBookTypeList);
    setShouldSend(true);
  }
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' > 
          <Route index element={<IndexPage />} />
          <Route path={AppRoute.Login} element={<LoginPage />} />
          <Route path={AppRoute.Report} element={<ReportPage clientList={clientList} />} />
          <Route path={AppRoute.Journal} element={<JournalPage setJournals={setJournalList} books={booklList} clients={clientList} journals={journalList}/>} />
          <Route path={AppRoute.Handbook} element={<HandbookPage setBookList={setBookList} setBookTypeList={setBookTypeList} setClientList={setClientList} books={booklList} clients={clientList} booksType={bookTypeList}/>} />
          </Route>
        <Route path="*" element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
