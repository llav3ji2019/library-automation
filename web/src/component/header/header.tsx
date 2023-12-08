import { Link } from "react-router-dom";
import { AppRoute } from "../../const";

function Header(): JSX.Element {
  return (
    <header className="header">
      <nav className="header-navbar">
        <img src="../img/logo.svg" alt="logo" className="logo" />
        <ul>
          <li><a href="#">Home</a></li>
          <li><a href="#">Contact</a></li>
          <li><a href="#">About</a></li>
        </ul>
      </nav>

      <div className="header-content">
        <h2>My Library</h2>
      </div>

      <div className="header__btn-list">
        <Link to={AppRoute.Journal} className="btn-list__item">Journal</Link>
        <Link to={AppRoute.Handbook} className="btn-list__item">Handbook</Link>
        <Link to={AppRoute.Report} className="btn-list__item">Report</Link>
      </div>
    </header>
  );
}

export default Header;
