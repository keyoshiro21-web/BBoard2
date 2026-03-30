import { FC } from "react";

type AddProps = {
  onClick: () => void;
};

export const AddColumnButton: FC<AddProps> = ({ onClick }) => {
  return (
    <button type="button" className="add-column-button" onClick={onClick}>
      Add Column +
    </button>
  );
};
