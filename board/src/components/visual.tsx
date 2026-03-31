import { FC } from "react";

type HeaderProps = {
  userName: string;
};

export const Header: FC<HeaderProps> = ({ userName }) => {
  return (
    <header className="header">
      <div>BloodBoard</div>
      <div>{userName}</div>
    </header>
  );
};
