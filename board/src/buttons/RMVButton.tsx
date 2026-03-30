import { FC } from "react";

type AddProps = {
  onClick: () => void;
};

export const RMVButton: FC<AddProps> = ({ onClick }) => {
  return (
    <button type="button" className="rmv" onClick={onClick}>
      X
    </button>
  );
};
