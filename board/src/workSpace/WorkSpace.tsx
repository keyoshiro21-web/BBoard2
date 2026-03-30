import { FC, useState } from "react";
import { Column, ColumnType } from "../components/Column";
import { AddColumnButton } from "../buttons/AddColumnButton";
import { ColumnInput } from "../input/ColumnInput";
import { Header } from "../components/visual";
import { useLocation, useParams } from "react-router-dom";
export const WorkSpace: FC = () => {
  const { id } = useParams();
  const location = useLocation;

  // const boardName = location.state?.name || "Board";

  const [columns, setColumns] = useState<ColumnType[]>([
    {
      id: crypto.randomUUID(),
      name: "Hui",
      tasks: [],
    },
  ]);

  const [value, setValue] = useState("");

  const createColumn = () => {
    if (!value.trim()) return;
    setColumns((dsrc) => [
      ...dsrc,
      { id: crypto.randomUUID(), name: value.trim(), tasks: [] },
    ]);
    setValue("");
  };

  const moveColumn = (columnIndex: number, dir: "left" | "right") => {
    const target = dir === "left" ? columnIndex - 1 : columnIndex + 1;
    if (target < 0 || target >= columns.length) return;
    setColumns((dsrc) => {
      const newColumns = [...dsrc];
      [newColumns[columnIndex], newColumns[target]] = [
        newColumns[target],
        newColumns[columnIndex],
      ];
      return newColumns;
    });
  };

  const addCard = (columnIndex: number, name: string) => {
    if (!name.trim()) return;
    setColumns((src) =>
      src.map((col, ai) =>
        ai === columnIndex
          ? {
              ...col,
              tasks: [...col.tasks, { id: crypto.randomUUID(), name }],
            }
          : col,
      ),
    );
  };

  const removeCard = (columnIndex: number, taskId: string) => {
    setColumns((src) =>
      src.map((col, ai) =>
        ai === columnIndex
          ? {
              ...col,
              tasks: col.tasks.filter((rm) => rm.id !== taskId),
            }
          : col,
      ),
    );
  };

  const moveTask = (
    taskId: string,
    columnIndex: number,
    dir: "left" | "right",
  ) => {
    const target = dir === "left" ? columnIndex - 1 : columnIndex + 1;
    if (target < 0 || target >= columns.length) return;

    const task = columns[columnIndex].tasks.find((t) => t.id === taskId);

    if (!task) return;

    setColumns((dsrc) =>
      dsrc.map((col, ai) => {
        if (ai === columnIndex) {
          return { ...col, tasks: col.tasks.filter((t) => t.id !== taskId) };
        }
        if (ai === target) {
          return { ...col, tasks: [...col.tasks, task] };
        }
        return col;
      }),
    );
  };

  const removeColumn = (column: ColumnType) => {
    setColumns((prev) => prev.filter((col) => col.id !== column.id));
  };

  return (
    <div>
      <Header titleName="BloodBoard" userName="KEY" />

      <ColumnInput value={value} setValue={setValue} />
      <AddColumnButton onClick={createColumn} />

      <div className="board">
        {columns.map((col, index) => (
          <Column
            addTask={addCard}
            column={col}
            columnIndex={index}
            moveColumn={moveColumn}
            moveTask={moveTask}
            removeTask={removeCard}
            removeColumn={removeColumn}
            totalColumns={columns.length}
          />
        ))}
      </div>
    </div>
  );
};
