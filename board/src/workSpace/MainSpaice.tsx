import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../components/visual";
import { Modal } from "../modal/Modal";
import { AddButton } from "../buttons/AddButton";

export type WorkspaceType = {
  id: string;
  name: string;
};

export const Home: FC = () => {
  const [Open, setOpen] = useState(false);
  const [workspaces, setWorkspaces] = useState<WorkspaceType[]>([]);
  const [value, setValue] = useState("");
  const navigate = useNavigate();
  const trimmedValue = value.trim();
  const isValid = trimmedValue.length >= 5 && trimmedValue.length <= 30;

  const createWorkspace = () => {
    const trimmed = value.trim();
    if (trimmed.length < 5 || trimmed.length > 30) return;

    const newWs = {
      id: crypto.randomUUID(),
      name: trimmed,
    };

    setWorkspaces((prev) => [...prev, newWs]);
    setValue("");
  };

  const openWorkspace = (id: string) => {
    navigate(`/workspace/${id}`, {
      state: { name: workspaces.find((ws) => ws.id === id)?.name },
    });
  };

  return (
    <div>
      <Header userName="KEY" />
      <h1>Workspaces</h1>
      <AddButton onClick={() => setOpen(true)} />
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
            Назва повинна бути від 5 до 30 символів, тільки малі букви.
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
          <div key={ws.id}>
            <button
              className="span-button"
              onClick={() => openWorkspace(ws.id)}
            >
              Open
            </button>
            <span>{ws.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
