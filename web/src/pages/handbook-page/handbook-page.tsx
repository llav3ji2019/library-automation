import Header from '../../component/header/header';
import Footer from '../../component/footer/footer';
import { Dispatch, SetStateAction, useState } from 'react';
import CustomForm from '../../component/form/custom-form';
import BookType from '../../types/book-type';
import Client from '../../types/client';
import Book from '../../types/book';
import HandbookTable from '../../component/handbook-table/handbook-table';
import ClientForm from '../../component/form/client-form/client-form';
import BookForm from '../../component/form/book-form/book-form';
import BookTypeForm from '../../component/form/book-type-form/book-type-form';
import axios from 'axios';
import { TableStatus } from '../../const';

type HandbookPageProps = {
  books: Book[];
  clients: Client[];
  booksType: BookType[];
  setBookList: Dispatch<SetStateAction<Book[]>>;
  setBookTypeList: Dispatch<SetStateAction<BookType[]>>;
  setClientList: Dispatch<SetStateAction<Client[]>>;
}

function HandbookPage({books, clients, booksType, setBookList, setBookTypeList, setClientList}: HandbookPageProps): JSX.Element {
  
  const defaultClient = {
    id: 0,
    first_name: "Enter your name",
    last_name: "Enter your surname",
    father_name: "Enter your father's name",
    passport_seria: "Enter passport seria",
    passport_num: "Enter your pasport number"
  }

  const defaultBook = {
    id: 0,
    name: "Enter book name",
    cnt: 0,
    type_name: "Choose book type"
  }

  const defaultBookType = {
    id: 0,
    name: "Enter book type name",
    fine: 0,
    day_count: 0
  }
  const handleChangeClient = (newClient: Client) => {        
    axios.put<string>(
      'http://localhost:8080/library/client/update',
      newClient,
      {
        headers: {
          Accept: 'application/json',
        },
        timeout: 200,
      },
    ).then(response => {
      const newList = clients.map((item) => {
        if (item.id === newClient.id) {  
          return newClient;
        }
        return item;
      });
      setClientList(newList);
      return response;
    }).catch((error) => {
      alert(error.response.data);
    });  
}

const handleAddClient = (newClient: Client) => {
  const request = {
    ...newClient,
    id: clients.length + 2,
  }

  axios.post<string>(
    'http://localhost:8080/library/client/add',
    request,
    {
      headers: {
        Accept: 'application/json',
      },
      timeout: 200,
    },
  ).then(response => {
    setClientList(oldClientList => [...oldClientList, request]);
    window.location.reload();
    return response;
  }).catch((error) => {
    alert(error.response.data);
  });
}

const handleDeleteClient = (deletedClient: Client) => { 
  axios.delete<string>(
    `http://localhost:8080/library/client/delete/${deletedClient.id}`
  ).then(response => {
    const newList = clients.filter((item) => {
      item.id !== deletedClient.id
    });
    setClientList(newList);
    window.location.reload();
    return response;
  }).catch((error) => {
    alert(error.response.data);
  });
}

const handleChangeBookType = (newBookType: BookType) => {
  
  console.log(JSON.stringify(curBookType));   
  axios.put<string>(
    'http://localhost:8080/library/book_type/update',
    newBookType,
    {
      headers: {
        Accept: 'application/json',
      },
      timeout: 200,
    },
  ).then(response => {
    const newList = booksType.map((item) => {
      if (item.id === newBookType.id) {  
        return newBookType;
      }
      return item;
    });
    setBookTypeList(newList);
    return response;
  }).catch((error) => {
    alert(error.response.data);
  });  
}

const handleAddBookType = (newBookType: BookType) => {
const request = {
  ...newBookType,
  id: booksType.length + 2
}

axios.post<string>(
  'http://localhost:8080/library/book_type/add',
  request,
  {
    headers: {
      Accept: 'application/json',
    },
    timeout: 200,
  },
).then(response => {
  setBookTypeList(oldBookTypeList => [...oldBookTypeList, request]);
  window.location.reload();
  return response;
}).catch((error) => {
  alert(error.response.data);
});
}

const handleDeleteBookType = (deletedBookType: BookType) => {
axios.delete<string>(
  `http://localhost:8080/library/book_type/delete/${deletedBookType.id}`
).then(response => {
  const newList = booksType.filter((item) => {
    item.id !== deletedBookType.id
  });
  setBookTypeList(newList);
  window.location.reload();
  return response;
}).catch((error) => {
  alert(error.response.data);
});
}

const handleChangeBook = (newBook: Book) => {
  const request = {
    id: newBook.id,
    name: newBook.name,
    cnt: newBook.cnt,
    type_id: booksType.findIndex((type) => type.name === newBook.type_name) + 1,
  }    
      
  axios.put<string>(
    'http://localhost:8080/library/book/update',
    request,
    {
      headers: {
        Accept: 'application/json',
      },
      timeout: 200,
    },
  ).then(response => {
    const newList = books.map((item) => {
      if (item.id === newBook.id) {  
        return newBook;
      }
      return item;
    });
    setBookList(newList);
    return response;
  }).catch((error) => {
    alert(error.response.data);
  });  
}

const handleAddBook = (newBook: Book) => {
const request = {
  ...newBook,
  id: books.length + 2,
  book_id: booksType.findIndex((type) => type.name === newBook.type_name) + 1,
}

axios.post<string>(
  'http://localhost:8080/library/book/add',
  request,
  {
    headers: {
      Accept: 'application/json',
    },
    timeout: 200,
  },
).then(response => {
  const newListElement = {...newBook, id: request.id}
  setBookList(oldBookList => [...oldBookList, newListElement]);
  window.location.reload();
  return response;
}).catch((error) => {
  alert(error.response.data);
});
}

const handleDeleteBook = (deletedBook: Book) => {
axios.delete<string>(
  `http://localhost:8080/library/book/delete/${deletedBook.id}`
).then(response => {
  const newList = books.filter((item) => {
    item.id !== deletedBook.id
  });
  setBookList(newList);
  window.location.reload();
  return response;
}).catch((error) => {
  alert(error.response.data);
});
}

  const [curClient, setCurrentClient] = useState<Client>(defaultClient);
  const [isClientUpdateMethod, setIsClientUpdateMethod] = useState(true);

  const [curBook, setCurrentBook] = useState<Book>(defaultBook);
  const [isBookUpdateMethod, setIsBookUpdateMethod] = useState(true);

  const [curBookType, setCurrentBookType] = useState<BookType>(defaultBookType);
  const [isBookTypeUpdateMethod, setIsBookTypeUpdateMethod] = useState(true);

  const [tableState, setTableState] = useState(TableStatus.CLIENT_STATE);
  const [formActive, setFromActive] = useState(false);

  return(
    <>
      <Header />
      <section className="section">
        <div className="section__choose-schema">
          <div className="section__switcher-of-schema" role="radiogroup">
              <label>
                  <input className="section__radio-button" type="radio" name="switcher" value="Client" role="radio" autoFocus
                  onClick={() => setTableState(TableStatus.CLIENT_STATE)}/>
                  <span className="section__radio-button-text">Client</span>
              </label>
          </div>
          <div className="section__switcher-of-schema">
              <label>
                  <input className="section__radio-button" type="radio" name="switcher" value="Book" role="radio" onClick={() => setTableState(TableStatus.BOOK_STATE)}/>
                  <span className="section__radio-button-text">Book</span>
              </label>
          </div>
          <div className="section__switcher-of-schema">
              <label>
                  <input className="section__radio-button" type="radio" name="switcher" value="Book type" role="radio" onClick={() => setTableState(TableStatus.BOOK_TYPE_STATE)}/>
                  <span className="section__radio-button-text">Book type</span>
              </label>
          </div>
        </div>

        <table>
          {
            <HandbookTable books={books} tableStatus={tableState} booksType={booksType} clients={clients}
            setIsBookTypeUpdateMethod={setIsBookTypeUpdateMethod} setIsBookUpdateMethod={setIsBookUpdateMethod} setIsClientUpdateMethod={setIsClientUpdateMethod} setFormActive={setFromActive} setCurrentClient={setCurrentClient} setCurrentBookType={setCurrentBookType} setCurrentBook = {setCurrentBook} handleDeleteBook={handleDeleteBook} handleDeleteBookType={handleDeleteBookType} handleDeleteClient={handleDeleteClient}/>
          }
        </table>
        <button type="submit" className="btn-add-row"
        onClick={() => {
          setFromActive(true);

        }}>Add value</button>
        {tableState === TableStatus.CLIENT_STATE && <CustomForm active = {formActive} setActive={setFromActive}
        children={<ClientForm currentClient ={curClient} onAddClient = {handleAddClient} onChangeClient = {handleChangeClient} isClientUpdateMethod = {isClientUpdateMethod} setCurrentClient={setCurrentClient} setActive={setFromActive}/>} />}

        {tableState === TableStatus.BOOK_STATE && <CustomForm active = {formActive} setActive={setFromActive}
        children={<BookForm setCurrentBook = {setCurrentBook} currentBook={curBook} bookTypes={booksType} onAddBook={handleAddBook} onChangeBook={handleChangeBook} isBookUpdateMethod={isBookUpdateMethod} setActive={setFromActive}/>} />}

        {tableState === TableStatus.BOOK_TYPE_STATE && <CustomForm active = {formActive} setActive={setFromActive}
        children={<BookTypeForm setCurrentBookType={setCurrentBookType} currentBookType={curBookType} onAddBookType={handleAddBookType} onChangeBookType={handleChangeBookType} isBookTypeUpdateMethod = {isBookTypeUpdateMethod} setActive={setFromActive}/>} />}
      </section>
      <Footer />
    </>
  );
}
export default HandbookPage;
