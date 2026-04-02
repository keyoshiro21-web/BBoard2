import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../components/visual";
import { Modal } from "../modal/Modal";
import { ActionButton, ActionButtonType } from "../buttons/ActionButton";
import { useBoardStore } from "../store/useBoardStore";

export const Home: FC = () => {
  const [Open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const workspaces = useBoardStore((state) => state.workspaces);
  const addWorkspace = useBoardStore((state) => state.addWorkspace);
  const removeWorkspace = useBoardStore((state) => state.removeWorkspace);

  const navigate = useNavigate();

  const trimmedValue = value.trim();
  const isValid = trimmedValue.length >= 5 && trimmedValue.length <= 30;

  const createWorkspace = () => {
    const trimmed = value.trim();
    if (trimmed.length < 5 || trimmed.length > 30) return;

    addWorkspace(trimmed);
    setValue("");
  };

  const openWorkspace = (id: string) => {
    const workspace = workspaces.find((ws) => ws.id === id);
    navigate(`/workspace/${id}`, {
      state: { name: workspace?.name },
    });
  };

  const deleteWorkspace = (id: string) => {
    removeWorkspace(id);
  };

  return (
    <div>
      <Header userName="KEY" />
      <h1>Workspaces</h1>
      <ActionButton
        type={ActionButtonType.OpenModal}
        onClick={() => setOpen(true)}
      />
      <Modal isOpened={Open} onClose={() => setOpen(false)}>
        <input
          className="placeholder"
          value={value}
          onChange={(e) => setValue(e.target.value.toLowerCase())}
          placeholder="Workspace name"
          maxLength={30}
        />
        {value && !isValid && (
          <p style={{ color: "red", fontSize: "12px" }}>
            No less than 5 and no more than 30 symbols.
          </p>
        )}
        <button
          className="button"
          onClick={createWorkspace}
          disabled={!isValid}
        >
          Create
        </button>
      </Modal>
      <div className="span">
        {workspaces.map((ws) => (
          <div key={ws.id} className="workspace-entry">
            <button
              className="span-button"
              onClick={() => openWorkspace(ws.id)}
            >
              Open
            </button>
            <button
              className="span-button delete-button"
              onClick={() => deleteWorkspace(ws.id)}
            >
              Delete
            </button>
            <span>{ws.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
