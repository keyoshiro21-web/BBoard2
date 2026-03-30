import { FC } from "react";
import { LeftCardButton } from "../buttons/LeftCardButton";
import { RightCardButton } from "../buttons/RightCardButton";
import { RMVButton } from "../buttons/RMVButton";

type CardProps = {
  cardText: string;
  onRemove: () => void;
  onLeft?: () => void;
  onRight?: () => void;
};

export const Card: FC<CardProps> = ({
  cardText,
  onRemove,
  onLeft,
  onRight,
}) => {
  return (
    <div className="card">
      {cardText}
      {onLeft && <LeftCardButton onClick={onLeft} />}
      {onRight && <RightCardButton onClick={onRight} />}
      <RMVButton onClick={onRemove} />
    </div>
  );
};
