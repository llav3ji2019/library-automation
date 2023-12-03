function Footer(): JSX.Element {
  return (
    <footer className="journal-footer">
      <nav className="journal-footer__navbar">
        <ul>
          <li><a href="#">Home</a></li>
          <li><a href="#">Contact</a></li>
          <li><a href="#">About</a></li>
        </ul>
      </nav>
      <div className="footer__logo">
        <a href="index.html"><img src="../img/logo.svg" alt="logo" className="logo" /></a>
      </div>
    
    </footer>
  );
}

export default Footer;
