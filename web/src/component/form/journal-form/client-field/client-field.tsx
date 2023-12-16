import Journal from '../../../../types/journal';
import { Dispatch, SetStateAction } from 'react';
import Client from '../../../../types/client';
import { getFullName } from '../../../../utils/client-utils';

type ClientFieldProps = {
  setCurrentJournal: Dispatch<SetStateAction<Journal>>,
  currentJournal: Journal,
  clients: Client[],
}

function ClientField({clients, setCurrentJournal, currentJournal} : ClientFieldProps):JSX.Element {
  return (
    <div className="custom-form-block">
    <div className="select">
      <div className="select__header">
        <span className="select__current">{currentJournal?.client_name ?? "Client name"}</span>
        <div className="select__icon">&times;</div>
      </div>
      <div className="select__body">
      {
        clients.map(el => (
        <div className="select__item" 
        onClick={() => {
          setCurrentJournal({
            ...currentJournal,
            client_name: getFullName(el)
          });
        }}>
          {getFullName(el)}
        </div>))
      }
      </div>
    </div>
  </div>
  );
}

export default ClientField;