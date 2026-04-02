import { FC, useState } from "react";
import { Column } from "../components/Column";
import { ActionButton, ActionButtonType } from "../buttons/ActionButton";
import { ColumnInput } from "../input/ColumnInput";
import { Header } from "../components/visual";
import { useLocation, useParams } from "react-router-dom";
import { useBoardStore } from "../store/useBoardStore";

export const WorkSpace: FC = () => {
  const { id } = useParams();
  const location = useLocation();
  const workspaceId = id ?? "";

  const {
    getWorkspaceById,
    getColumns,
    addColumn,
    moveColumn,
    addTask,
    removeTask,
    moveTask,
    removeColumn,
  } = useBoardStore();

  const workspaceName =
    location.state?.name || getWorkspaceById(workspaceId)?.name || "Workspace";

  const columns = getColumns(workspaceId);

  const [value, setValue] = useState("");

  const createColumn = () => {
    if (!workspaceId || !value.trim()) return;
    addColumn(workspaceId, value);
    setValue("");
  };

  const handleAddCard = (columnIndex: number, name: string) => {
    if (!workspaceId) return;
    addTask(workspaceId, columnIndex, name);
  };

  const handleRemoveCard = (columnIndex: number, taskId: string) => {
    if (!workspaceId) return;
    removeTask(workspaceId, columnIndex, taskId);
  };

  const handleMoveTask = (
    taskId: string,
    columnIndex: number,
    dir: "left" | "right",
  ) => {
    if (!workspaceId) return;
    moveTask(workspaceId, taskId, columnIndex, dir);
  };

  const moveColumnHandler = (columnIndex: number, dir: "left" | "right") => {
    if (!workspaceId) return;
    moveColumn(workspaceId, columnIndex, dir);
  };

  const handleRemoveColumn = (columnId: string) => {
    if (!workspaceId) return;
    removeColumn(workspaceId, columnId);
  };

  return (
    <div>
      <Header userName={workspaceName} />

      <ColumnInput value={value} setValue={setValue} />
      <ActionButton type={ActionButtonType.AddColumn} onClick={createColumn} />

      <div className="board">
        {columns.map((col, index) => (
          <Column
            addTask={handleAddCard}
            column={col}
            columnIndex={index}
            moveColumn={moveColumnHandler}
            moveTask={handleMoveTask}
            removeTask={handleRemoveCard}
            removeColumn={() => handleRemoveColumn(col.id)}
            totalColumns={columns.length}
          />
        ))}
      </div>
    </div>
  );
};
