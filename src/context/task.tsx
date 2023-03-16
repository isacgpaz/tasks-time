import {
  createContext,
  ReactNode,
  useContext,
  useMemo,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import { TaskWithTimeFormatted } from "../ts/task";

type TaskProviderProps = {
  children: ReactNode;
};

type TaskContextProps = {
  selectedTask: TaskWithTimeFormatted | undefined;
  setSelectedTask: Dispatch<SetStateAction<TaskWithTimeFormatted | undefined>>;
  showCountdown: boolean;
  setShowContdown: Dispatch<SetStateAction<boolean>>;
};

export const TaskContext = createContext({} as TaskContextProps);

export function TaskProvider({ children }: TaskProviderProps) {
  const [selectedTask, setSelectedTask] = useState<
    TaskWithTimeFormatted | undefined
  >(undefined);

  const [showCountdown, setShowContdown] = useState(false);

  const TaskContextValues = useMemo(
    () => ({ selectedTask, setSelectedTask, showCountdown, setShowContdown }),
    [selectedTask, setSelectedTask, showCountdown, setShowContdown]
  );

  return (
    <TaskContext.Provider value={TaskContextValues}>
      {children}
    </TaskContext.Provider>
  );
}

export function useTask() {
  const context = useContext(TaskContext);

  if (context) {
    return context;
  }

  throw new Error("useTask must be used within a TaskProvider");
}
