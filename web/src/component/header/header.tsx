
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
        <button type="button" className="btn-list__item">Journal</button>
        <button type="button" className="btn-list__item">Handbook</button>
        <button type="button" className="btn-list__item">Report</button>
      </div>
    </header>
  );
}

export default Header;
