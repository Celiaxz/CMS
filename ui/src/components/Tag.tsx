import { useState } from "react";

import { TagAction } from "../utils";

interface ITag {
  onClickCheckbox: (tag: string, action: TagAction) => void;
  tag: string;
}

const Tag = (props: ITag) => {
  const [tagAction, setTagAction] = useState(TagAction.Remove);
  const { tag, onClickCheckbox } = props;

  const onClickHandler = (tag: string) => {
    const newTagAction =
      tagAction === TagAction.Add ? TagAction.Remove : TagAction.Add;
    setTagAction(newTagAction);
    onClickCheckbox(tag, newTagAction);
  };

  return (
    <>
      <label key={tag}>
        <input
          type="checkbox"
          value={tag}
          onClick={() => onClickHandler(tag)}
        />{" "}
        {tag}
      </label>
    </>
  );
};

export default Tag;
