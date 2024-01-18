import Client from "../../types/client";
import { Dispatch, SetStateAction } from "react";

type ClientTableProps = {
  clients: Client[],
  setFormActive: Dispatch<SetStateAction<boolean>>,
  setIsClientUpdateMethod: Dispatch<SetStateAction<boolean>>,
  setCurrentClient: Dispatch<SetStateAction<Client>>,
  handleDeleteClient: (newClient: Client) => void
}

function ClientTable({clients, setCurrentClient, setFormActive, setIsClientUpdateMethod, handleDeleteClient}: ClientTableProps): JSX.Element {
  return (
    <>
        <tr>
          <td>Id</td>
          <td>First name</td>
          <td>Last name</td>
          <td>Father name</td>
          <td>Pasport seria</td>
          <td>Pasport number</td>
          <td colSpan={2}>Actions</td>
        </tr>
        {
            clients.map((client) => (
              <tr key={client.id} >
                <td>{client.id}</td>
                <td>{client.first_name}</td>
                <td>{client.last_name}</td>
                <td>{client.father_name}</td>
                <td>{client.passport_seria}</td>
                <td>{client.passport_num}</td>
                <td className="td__edit-action" onClick={() => {
                  setIsClientUpdateMethod(true);
                  setCurrentClient(client);
                  setFormActive(true);
                }}>
                  <img src="../img/edit-icon.svg" alt="edit" width="32px" height="32px" />
                </td>
                <td className="td__remove-action" onClick = {
                      () => {
                        setCurrentClient(client);
                        handleDeleteClient(client);
                        }
                      }>
                  <img src="../img/remove-icon.svg" alt="remove" width="32px" height="32px" />
                </td>
              </tr>
            ))
          }
      </>
  );
}

export default ClientTable;
