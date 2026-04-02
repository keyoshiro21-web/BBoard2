import { FC } from "react";
import { ActionButton, ActionButtonType } from "../buttons/ActionButton";

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
      {onLeft && (
        <ActionButton type={ActionButtonType.MoveCardLeft} onClick={onLeft} />
      )}
      {onRight && (
        <ActionButton type={ActionButtonType.MoveCardRight} onClick={onRight} />
      )}
      <ActionButton type={ActionButtonType.RemoveCard} onClick={onRemove} />
    </div>
  );
};
