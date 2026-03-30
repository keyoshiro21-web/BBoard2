import { FC } from "react";

type AddProps = {
  onClick: () => void;
};

export const LeftColumnButton: FC<AddProps> = ({ onClick }) => {
  return (
    <button type="button" className="arrow" onClick={onClick}>
      ⬅
    </button>
  );
};
