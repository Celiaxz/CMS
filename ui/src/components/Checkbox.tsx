import { useState } from "react";

import { CheckboxAction } from "../utils";

interface ICheckbox {
  onClickCheckbox: (tag: string, action: CheckboxAction) => void;
  fieldName: string;
}

//state for checkboxaction
// destructure fieldname & onclickcheckbox
const Checkbox = (props: ICheckbox) => {
  const [checkboxAction, setCheckboxAction] = useState(CheckboxAction.Remove);
  const { fieldName, onClickCheckbox } = props;

  //onclick handler to check but add and remove
  // also call the onclickcheckbox callback with the tag and new action
  const onClickHandler = (tag: string) => {
    const newCheckboxAction =
      checkboxAction === CheckboxAction.Add
        ? CheckboxAction.Remove
        : CheckboxAction.Add;
    setCheckboxAction(newCheckboxAction);
    onClickCheckbox(tag, newCheckboxAction);
  };

  //renders a checkbox
  //calls handler when you click on the checkbox
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
