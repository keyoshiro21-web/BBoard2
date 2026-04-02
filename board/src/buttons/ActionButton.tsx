import { FC } from "react";

export enum ActionButtonType {
  AddCard = "addCard",
  AddColumn = "addColumn",
  MoveCardLeft = "moveCardLeft",
  MoveCardRight = "moveCardRight",
  MoveColumnLeft = "moveColumnLeft",
  MoveColumnRight = "moveColumnRight",
  RemoveCard = "removeCard",
  RemoveColumn = "removeColumn",
  OpenModal = "openModal",
}

type ActionButtonProps = {
  type: ActionButtonType;
  onClick: () => void;
  disabled?: boolean;
};

const buttonConfig: Record<
  ActionButtonType,
  { label: string; className: string }
> = {
  [ActionButtonType.AddCard]: { label: "Add Card +", className: "add-button" },
  [ActionButtonType.AddColumn]: {
    label: "Add Column +",
    className: "add-column-button",
  },
  [ActionButtonType.MoveCardLeft]: { label: "⬅", className: "arrow" },
  [ActionButtonType.MoveCardRight]: { label: "➡", className: "arrow" },
  [ActionButtonType.MoveColumnLeft]: { label: "⬅", className: "arrow" },
  [ActionButtonType.MoveColumnRight]: { label: "➡", className: "arrow" },
  [ActionButtonType.RemoveCard]: { label: "X", className: "rmv" },
  [ActionButtonType.RemoveColumn]: { label: "×", className: "rmv" },
  [ActionButtonType.OpenModal]: { label: "Add +", className: "add-button" },
};

export const ActionButton: FC<ActionButtonProps> = ({
  type,
  onClick,
  disabled,
}) => {
  const config = buttonConfig[type];
  return (
    <button
      type="button"
      className={config.className}
      onClick={onClick}
      disabled={disabled}
      title={type}
    >
      {config.label}
    </button>
  );
};
