import { FC } from "react";

type ColumnInputProps = {
  value: string;
  setValue: (v: string) => void;
};

export const ColumnInput: FC<ColumnInputProps> = ({ value, setValue }) => {
  return (
    <input
      type="text"
      className="column-input"
      placeholder="Enter text"
      value={value}
      onChange={(ev) => setValue(ev.target.value)}
    />
  );
};
