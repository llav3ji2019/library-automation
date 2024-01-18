import { Dispatch, SetStateAction } from "react";

type CustomFormProps = {
  active: boolean;
  setActive: Dispatch<SetStateAction<boolean>>;
  children: JSX.Element;
}

function CustomForm(props: CustomFormProps): JSX.Element {
  return (
    <div className={props.active ? "form active" : "form"} onClick={() => props.setActive(false)}>
      <div className={props.active ? "form__content active" : "form__content"} onClick={e => e.stopPropagation()}>
        {props.active && props.children}
      </div>
    </div>  
  );
}

export default CustomForm;
