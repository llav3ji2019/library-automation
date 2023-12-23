import {BrowserRouter, Route, Routes} from 'react-router-dom';
import IndexPage from '../../pages/index/index-page';
import { AppRoute } from '../../const';
import JournalPage from '../../pages/journal-page/journal-page';
import LoginPage from '../../pages/login-page/login-page';
import HandbookPage from '../../pages/handbook-page/handbook-page';
import Error404 from '../../pages/error-404/error-404';
import { useRef, useEffect, useState } from 'react';
import Journal from '../../types/journal';
import Book from '../../types/book';
import BookType from '../../types/book-type';
import Client from '../../types/client';
import { getAllBookTypes, getAllBooks, getAllClients, getAllJournals } from '../../http-requests/http-requests';
import ReportPage from '../../pages/report-page/report-page';
import WorkerPrivateRoute from '../private-route/worker-privar-route';
import AdminPrivateRoute from '../private-route/admin-private-route';
import { getToken } from '../../token/token';

function App(): JSX.Element {
  const [loginStatus, setLoginStatus] = useState(getToken());
  const [journalList, setJournalList] = useState<Journal[]>([]);
  const [booklList, setBookList] = useState<Book[]>([]);
  const [bookTypeList, setBookTypeList] = useState<BookType[]>([]);
  const [clientList, setClientList] = useState<Client[]>([]);
  const isRenderedRef = useRef(false);

  useEffect(
    () => {
      if (!isRenderedRef.current) {
        getAllJournals(setJournalList);
        getAllClients(setClientList);
        getAllBooks(setBookList);
        getAllBookTypes(setBookTypeList);
        isRenderedRef.current = true;
      }
    }, []);
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' > 
          <Route index element={
            <WorkerPrivateRoute authorizationStatus={loginStatus}>
              <IndexPage />
            </WorkerPrivateRoute>            
          } />
          <Route path={AppRoute.Login} element={<LoginPage loginStatus = {loginStatus} setLoginStatus={setLoginStatus}/>} />
          <Route path={AppRoute.Handbook} element={
            <AdminPrivateRoute authorizationStatus={loginStatus}>
              <HandbookPage setBookList={setBookList} setBookTypeList={setBookTypeList} setClientList={setClientList} books={booklList}
                clients={clientList} booksType={bookTypeList}/>
            </AdminPrivateRoute>            
          } />

          <Route path={AppRoute.Report} element={
            <AdminPrivateRoute authorizationStatus={loginStatus}>
              <ReportPage clientList={clientList} />
            </AdminPrivateRoute>            
          } />

          <Route path={AppRoute.Journal} element={
            <WorkerPrivateRoute authorizationStatus={loginStatus}>
              <JournalPage setJournals={setJournalList} books={booklList} clients={clientList} journals={journalList}/>
            </WorkerPrivateRoute>            
          } />
          </Route>
        <Route path="*" element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
