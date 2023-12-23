import { Dispatch, SetStateAction, FormEvent } from "react";
import Client from "../../../types/client";

type ClientFormProps = {
  setActive: Dispatch<SetStateAction<boolean>>;
  setCurrentClient: Dispatch<SetStateAction<Client>>,
  currentClient: Client,
  onAddClient: (client: Client) => void,
  onChangeClient: (client: Client) => void,
  isClientUpdateMethod: boolean
}

function ClientForm({setActive, setCurrentClient, currentClient, onAddClient, onChangeClient, isClientUpdateMethod}: ClientFormProps): JSX.Element {
  const handleFieldChange = (evt: FormEvent<HTMLInputElement>) => {
    const {name, value} = evt.currentTarget;
    setCurrentClient({
      ...currentClient,
      [name]: value
    })
  }

  return (
  <div className="journal-form">
    <h2 className="custom-form__title">Client Form</h2>
    <form>
      <div className="custom-form-block">
        <label>Last name</label>
        <input type="text" id="last_name" name="last_name" autoComplete="off" defaultValue={currentClient.last_name || "Enter your surname"}
        onChange={handleFieldChange} />
      </div>
      <div className="custom-form-block">
        <label>First name</label>
        <input type="text" id="first_name" name="first_name" autoComplete="off" defaultValue={currentClient.first_name || "Enter your name"}
        onChange={handleFieldChange} />
      </div>
      <div className="custom-form-block">
        <label>Father name</label>
        <input type="text" id="father_name" name="father_name" autoComplete="off" defaultValue={currentClient.father_name || "Enter your father's name"} onChange={handleFieldChange} />
      </div>
      <div className="custom-form-block">
        <label>Passport seria</label>
        <input type="number" id="passport_seria" name="passport_seria" autoComplete="off"
        defaultValue={currentClient.passport_seria || "Enter passport seria"} onChange={handleFieldChange} />
      </div>
      <div className="custom-form-block">
        <label>Passport number</label>
        <input type="number" id="passport_num" name="passport_num" autoComplete="off"
        defaultValue={currentClient.passport_num || "Enter your pasport number"} onChange={handleFieldChange}/>
      </div>
    </form>
    <input type="submit" name="submit" value="Submit"
    onClick={() => {
      setActive(false);
      if (isClientUpdateMethod) {
        onChangeClient(currentClient);
      }
      else {
        onAddClient(currentClient);
      }
      }
    } />
  </div>
  );
}

export default ClientForm;