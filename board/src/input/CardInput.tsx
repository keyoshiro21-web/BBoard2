import { FC } from "react";

type CardInputProps = {
  value: string;
  setValue: (v: string) => void;
};

export const CardInput: FC<CardInputProps> = ({ value, setValue }) => {
  return (
    <input
      type="text"
      className="card-input"
      placeholder="Enter text"
      value={value}
      onChange={(ev) => setValue(ev.target.value)}
    />
  );
};
