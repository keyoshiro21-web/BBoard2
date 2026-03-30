import { FC } from "react";

type AddProps = {
  onClick: () => void;
};

export const AddButton: FC<AddProps> = ({ onClick }) => {
  return (
    <button type="button" className="add-button" onClick={onClick}>
      Add Card +
    </button>
  );
};
