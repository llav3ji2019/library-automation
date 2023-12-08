import Header from '../../component/header/header';
import Footer from '../../component/footer/footer';
import { useState } from 'react';
import JournalForm from '../../component/form/journal-form/journal-form';

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

function HandbookPage(): JSX.Element {

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
                  <input className="section__radio-button" type="radio" name="switcher" value="Client" role="radio" checked />
                  <span className="section__radio-button-text">Client</span>
              </label>
          </div>
          <div className="section__switcher-of-schema">
              <label>
                  <input className="section__radio-button" type="radio" name="switcher" value="Book" role="radio" />
                  <span className="section__radio-button-text">Book</span>
              </label>
          </div>
          <div className="section__switcher-of-schema">
              <label>
                  <input className="section__radio-button" type="radio" name="switcher" value="Book type" role="radio" />
                  <span className="section__radio-button-text">Book type</span>
              </label>
          </div>
        </div>

        <table>
          <tr>
            <td>Id</td>
            <td>Book Name</td>
            <td>Client name</td>
            <td>Date begin</td>
            <td>Date end</td>
            <td>Date return</td>
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
        <button type="submit" className="btn-add-row" onClick={() => setFromActive(true)}>Add value</button>
        <JournalForm active = {formActive} setActive={setFromActive} >
          <div className="journal-form">
            <h2 className="custom-form__title">Login</h2>
              <form>
              <div className="custom-form-block">
                  <div className="select">
                    <div className="select__header">
                      <span className="select__current">Client name</span>
                      <div className="select__icon">&times;</div>
                    </div>
                  
                    <div className="select__body">
                      <div className="select__item">Value 1</div>
                      <div className="select__item">Value 2</div>
                      <div className="select__item">Value 3</div>
                      <div className="select__item">Value 4</div>
                      <div className="select__item">Value 5</div>
                    </div>
                  </div>
                </div>
                <div className="custom-form-block">
                  <div className="select">
                    <div className="select__header">
                      <span className="select__current">Book name</span>
                      <div className="select__icon">&times;</div>
                    </div>
                  
                    <div className="select__body">
                      <div className="select__item">Value 1</div>
                      <div className="select__item">Value 2</div>
                      <div className="select__item">Value 3</div>
                      <div className="select__item">Value 4</div>
                      <div className="select__item">Value 5</div>
                    </div>
                  </div>
                </div>
                <div className="custom-form-block">
                  <label>Begin date:</label>
                  <input type="date" id="birthday" name="birthday" autoComplete="off" />
                </div>
                <div className="custom-form-block">
                  <label>End date:</label>
                  <input type="date" id="birthday" name="birthday" autoComplete="off" />
                </div>
                <div className="custom-form-block">
                  <label>Return date:</label>
                  <input type="date" id="birthday" name="birthday" autoComplete="off" />
                </div>
              </form>
            <input type="submit" name="submit" value="Submit" onClick={() => setFromActive(false)} />
          </div>
          </JournalForm>
      </section>
      <Footer />
    </>
  );
}

export default HandbookPage;