import { create } from "zustand";
import { ColumnType } from "../components/Column";

export type WorkspaceType = {
  id: string;
  name: string;
};

type BoardState = {
  workspaces: WorkspaceType[];
  columnsByWorkspace: Record<string, ColumnType[]>;
  addWorkspace: (name: string) => void;
  removeWorkspace: (id: string) => void;
  getWorkspaceById: (id: string) => WorkspaceType | undefined;
  getColumns: (workspaceId: string) => ColumnType[];
  addColumn: (workspaceId: string, name: string) => void;
  removeColumn: (workspaceId: string, columnId: string) => void;
  moveColumn: (
    workspaceId: string,
    columnIndex: number,
    dir: "left" | "right",
  ) => void;
  addTask: (workspaceId: string, columnIndex: number, taskName: string) => void;
  removeTask: (
    workspaceId: string,
    columnIndex: number,
    taskId: string,
  ) => void;
  moveTask: (
    workspaceId: string,
    taskId: string,
    columnIndex: number,
    dir: "left" | "right",
  ) => void;
};

export const useBoardStore = create<BoardState>((set, get) => ({
  workspaces: [],
  columnsByWorkspace: {},

  addWorkspace: (name) => {
    const id = crypto.randomUUID();
    set((state) => ({
      workspaces: [...state.workspaces, { id, name }],
      columnsByWorkspace: {
        ...state.columnsByWorkspace,
        [id]: [],
      },
    }));
  },

  removeWorkspace: (id) => {
    set((state) => {
      const next = { ...state.columnsByWorkspace };
      delete next[id];
      return {
        workspaces: state.workspaces.filter((ws) => ws.id !== id),
        columnsByWorkspace: next,
      };
    });
  },

  getWorkspaceById: (id) => get().workspaces.find((ws) => ws.id === id),

  getColumns: (workspaceId) => get().columnsByWorkspace[workspaceId] ?? [],

  addColumn: (workspaceId, name) => {
    if (!name.trim()) return;
    const newColumn: ColumnType = {
      id: crypto.randomUUID(),
      name: name.trim(),
      tasks: [],
    };

    set((state) => ({
      columnsByWorkspace: {
        ...state.columnsByWorkspace,
        [workspaceId]: [
          ...(state.columnsByWorkspace[workspaceId] ?? []),
          newColumn,
        ],
      },
    }));
  },

  removeColumn: (workspaceId, columnId) => {
    set((state) => ({
      columnsByWorkspace: {
        ...state.columnsByWorkspace,
        [workspaceId]: (state.columnsByWorkspace[workspaceId] ?? []).filter(
          (col) => col.id !== columnId,
        ),
      },
    }));
  },

  moveColumn: (workspaceId, columnIndex, dir) => {
    set((state) => {
      const current = [...(state.columnsByWorkspace[workspaceId] ?? [])];
      const target = dir === "left" ? columnIndex - 1 : columnIndex + 1;
      if (target < 0 || target >= current.length) return state;
      [current[columnIndex], current[target]] = [
        current[target],
        current[columnIndex],
      ];
      return {
        columnsByWorkspace: {
          ...state.columnsByWorkspace,
          [workspaceId]: current,
        },
      };
    });
  },

  addTask: (workspaceId, columnIndex, taskName) => {
    if (!taskName.trim()) return;
    set((state) => {
      const columns = [...(state.columnsByWorkspace[workspaceId] ?? [])];
      if (!columns[columnIndex]) return state;

      const task = { id: crypto.randomUUID(), name: taskName.trim() };
      columns[columnIndex] = {
        ...columns[columnIndex],
        tasks: [...columns[columnIndex].tasks, task],
      };

      return {
        columnsByWorkspace: {
          ...state.columnsByWorkspace,
          [workspaceId]: columns,
        },
      };
    });
  },

  removeTask: (workspaceId, columnIndex, taskId) => {
    set((state) => {
      const columns = [...(state.columnsByWorkspace[workspaceId] ?? [])];
      if (!columns[columnIndex]) return state;

      columns[columnIndex] = {
        ...columns[columnIndex],
        tasks: columns[columnIndex].tasks.filter((task) => task.id !== taskId),
      };

      return {
        columnsByWorkspace: {
          ...state.columnsByWorkspace,
          [workspaceId]: columns,
        },
      };
    });
  },

  moveTask: (workspaceId, taskId, columnIndex, dir) => {
    set((state) => {
      const columns = [...(state.columnsByWorkspace[workspaceId] ?? [])];
      const fromColumn = columns[columnIndex];
      if (!fromColumn) return state;

      const targetColumnIndex =
        dir === "left" ? columnIndex - 1 : columnIndex + 1;
      if (targetColumnIndex < 0 || targetColumnIndex >= columns.length)
        return state;

      const task = fromColumn.tasks.find((t) => t.id === taskId);
      if (!task) return state;

      const updatedFrom = {
        ...fromColumn,
        tasks: fromColumn.tasks.filter((t) => t.id !== taskId),
      };
      const updatedTarget = {
        ...columns[targetColumnIndex],
        tasks: [...columns[targetColumnIndex].tasks, task],
      };

      columns[columnIndex] = updatedFrom;
      columns[targetColumnIndex] = updatedTarget;

      return {
        columnsByWorkspace: {
          ...state.columnsByWorkspace,
          [workspaceId]: columns,
        },
      };
    });
  },
}));
