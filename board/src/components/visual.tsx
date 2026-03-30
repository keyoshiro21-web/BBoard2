import { FC } from "react";

type HeaderProps = {
  titleName: string;
  userName: string;
};

export const Header: FC<HeaderProps> = ({ titleName, userName }) => {
  return (
    <header className="header">
      <div>{titleName}</div>
      <div>{userName}</div>
    </header>
  );
};
