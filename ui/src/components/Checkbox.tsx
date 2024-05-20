import { useState } from "react";

import { CheckboxAction } from "../utils";

interface ICheckbox {
  onClickCheckbox: (tag: string, action: CheckboxAction) => void;
  fieldName: string;
}

const Checkbox = (props: ICheckbox) => {
  const [checkboxAction, setCheckboxAction] = useState(CheckboxAction.Remove);
  const { fieldName, onClickCheckbox } = props;

  const onClickHandler = (tag: string) => {
    const newCheckboxAction =
      checkboxAction === CheckboxAction.Add
        ? CheckboxAction.Remove
        : CheckboxAction.Add;
    setCheckboxAction(newCheckboxAction);
    onClickCheckbox(tag, newCheckboxAction);
  };

  return (
    <>
      <label key={fieldName}>
        <input
          type="checkbox"
          value={fieldName}
          onClick={() => onClickHandler(fieldName)}
        />{" "}
        {fieldName}
      </label>
    </>
  );
};

export default Checkbox;
