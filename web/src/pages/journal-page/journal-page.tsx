import Header from '../../component/header/header';
import Footer from '../../component/footer/footer';

function JournalPage():JSX.Element {
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
            <tr>
              <td>Id</td>
              <td>Book Name</td>
              <td>Client name</td>
              <td>Date begin</td>
              <td>Date end</td>
              <td>Date return</td>
              <td className="td__edit-action">
                <img src="../img/edit-icon.svg" alt="edit" width="32px" height="32px" />
              </td>
              <td className="td__remove-action">
                <img src="../img/remove-icon.svg" alt="remove" width="32px" height="32px" />
              </td>
            </tr>
          </table>
          <button type="submit" className="btn-add-row">Add value</button>
      </section>
      <Footer />
    </>
  );
}

export default JournalPage;
