import {BrowserRouter, Route, Routes} from 'react-router-dom';
import IndexPage from '../../pages/index/index-page';
import { AppRoute } from '../../const';
import JournalPage from '../../pages/journal-page/journal-page';
import LoginPage from '../../pages/login-page/login-page';
import HandbookPage from '../../pages/handbook-page/handbook-page';
import Error404 from '../../pages/error-404/error-404';

function App(): JSX.Element {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' >
          <Route index element={<IndexPage />} />
          <Route path={AppRoute.Login} element={<LoginPage />} />
          <Route path={AppRoute.Journal} element={<JournalPage />} />
          <Route path={AppRoute.Handbook} element={<HandbookPage />} />
          </Route>
        <Route path="*" element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;