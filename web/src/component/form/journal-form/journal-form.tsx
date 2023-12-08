import { Dispatch, SetStateAction } from "react";

type JournalFormProps = {
  active: boolean;
  setActive: Dispatch<SetStateAction<boolean>>;
  children: JSX.Element;
}

function JournalForm(props: JournalFormProps): JSX.Element {
  return (
    <div className={props.active ? "form active" : "form"} onClick={() => props.setActive(false)}>
      <div className={props.active ? "form__content active" : "form__content"} onClick={e => e.stopPropagation()}>
        {props.children}
      </div>
    </div>  
  );
}

export default JournalForm;
