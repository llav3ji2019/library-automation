import { useState } from "react";
import Footer from "../../component/footer/footer";
import Header from "../../component/header/header";
import Client from "../../types/client";
import axios from "axios";
import { getFullName } from "../../utils/client-utils";

type ReportPageProps = {
  clientList: Client[]
}

function ReportPage({ clientList }: ReportPageProps): JSX.Element {
  const [bookAmount, setBookAmount] = useState(0);
  const [biggestFine, setBiggestFine] = useState(0);
  const [clientFine, setClientFine] = useState(0);
  const [popularBookNameList, setPopularBookNameList] = useState<string[]>([]);
  const [currentClientName, setCurrentClientName] = useState("Client name");

  const findClientBookAmount = (client_id: number) => {
    axios.get<number>(
      `http://localhost:8080/library/journal/statistic/book/amount/${client_id}`,
      {
        headers: {
          Accept: 'application/json',
        },
      },
    ).then(response => {
      setBookAmount(response.data);
      return response;
    }).catch((exception) => {
      console.log(exception);
    });
  }

  const findTheBiggestFine = () => {
    axios.get<number>(
      'http://localhost:8080/library/journal/statistic/fine/biggest',
      {
        headers: {
          Accept: 'application/json',
        },
      },
    ).then(response => {
      setBiggestFine(response.data);
      return response;
    }).catch((exception) => {
      console.log(exception);
    });
  }

  const findClientFine = (client_id: number) => {
    axios.get<number>(
      `http://localhost:8080/library/journal/statistic/fine/sum/${client_id}`,
      {
        headers: {
          Accept: 'application/json',
        },
      },
    ).then(response => {
      setClientFine(response.data);
      return response;
    }).catch((exception) => {
      console.log(exception);
    });
  }

  const findMostPopularBooksNames = () => {
    axios.get<string[]>(
      'http://localhost:8080/library/journal/statistic/popular_book/name',
      {
        headers: {
          Accept: 'application/json',
        },
      },
    ).then(response => {
      setPopularBookNameList(response.data);
      return response;
    }).catch((exception) => {
      console.log(exception);
    });
  }
  return (
    <>
      <Header />
      <section className="section">
      <div className="report-form-block">
        <label>Choose statistic name: </label>
        <select className="report-page__select">
        {
          clientList.map(el => (
            <option onClick={() => {
              setCurrentClientName(getFullName(el));
            }}>
              {getFullName(el)}
            </option>
            ))
        }
      </select>
      <input type="submit" name="submit" value="Submit" onClick={() => {
        let clientNameForSearch = currentClientName === "Client name" ? getFullName(clientList[0]) : currentClientName;
        findTheBiggestFine();
        findMostPopularBooksNames();
        const clientId = clientList.findIndex((client) => getFullName(client) === clientNameForSearch) + 1;
        findClientFine(clientId);
        findClientBookAmount(clientId);
      }} />
      </div>

      <div className="reportData"><strong>Client book amount</strong> = {bookAmount}</div>
      <div className="reportData"><strong>The biggest fine</strong> = {biggestFine}</div>
      <div className="reportData"><strong>Client fine</strong> = {clientFine}</div>
      <div className="reportData"><strong>Most popular books names</strong>:<br></br>
      <ol>
      {
        popularBookNameList.map((bookName) => (
          <li>{bookName}</li>
        ))
      }
      </ol>
      
      </div>
      </section>
      <Footer />
    </>
    
  );
}

export default ReportPage;
