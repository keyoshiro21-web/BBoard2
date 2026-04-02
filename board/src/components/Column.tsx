import { Card } from "./Card";
import { ActionButton, ActionButtonType } from "../buttons/ActionButton";
import { CardInput } from "../input/CardInput";
import { FC, useState } from "react";

export type Task = {
  id: string;
  name: string;
};

export type ColumnType = {
  name: string;
  id: string;
  tasks: Task[];
};

type ColumnProps = {
  column: ColumnType;
  columnIndex: number;
  totalColumns: number;
  addTask: (columnIndex: number, text: string) => void;
  removeTask: (columnIndex: number, taskId: string) => void;
  moveTask: (
    taskId: string,
    columnIndex: number,
    dir: "left" | "right",
  ) => void;
  removeColumn: (column: ColumnType) => void;
  moveColumn: (columnIndex: number, dir: "left" | "right") => void;
};

export const Column: FC<ColumnProps> = ({
  column,
  columnIndex,
  totalColumns,
  addTask,
  moveColumn,
  moveTask,
  removeTask,
  removeColumn,
}) => {
  const [value, setValue] = useState("");

  const isFirst = columnIndex === 0;
  const isLast = columnIndex === totalColumns - 1;

  const handleTask = () => {
    addTask(columnIndex, value);
    setValue("");
  };

  return (
    <div className="column">
      <div className="columnHeader">
        {column.name}
        <div className="columnArrows">
          {!isFirst && (
            <ActionButton
              type={ActionButtonType.MoveColumnLeft}
              onClick={() => moveColumn(columnIndex, "left")}
            />
          )}
          {!isLast && (
            <ActionButton
              type={ActionButtonType.MoveColumnRight}
              onClick={() => moveColumn(columnIndex, "right")}
            />
          )}
        </div>
        <CardInput setValue={setValue} value={value} />
        <ActionButton type={ActionButtonType.AddCard} onClick={handleTask} />
        <div className="task">
          {column.tasks.map((src) => (
            <Card
              cardText={src.name}
              onLeft={
                !isFirst
                  ? () => moveTask(src.id, columnIndex, "left")
                  : undefined
              }
              onRemove={() => removeTask(columnIndex, src.id)}
              onRight={
                !isLast
                  ? () => moveTask(src.id, columnIndex, "right")
                  : undefined
              }
              key={src.id}
            />
          ))}
        </div>
        <ActionButton
          type={ActionButtonType.RemoveColumn}
          onClick={() => removeColumn(column)}
        />
      </div>
    </div>
  );
};
