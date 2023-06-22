import styles from "./Home.module.css";
import { useState } from "react";
import Logo from "../assets/Logo.png";
import { NewTask } from "../components/NewTask";
import { TaskStatus } from "../components/TaskStatus";
import { Tasks } from "../components/Tasks";

interface Task {
  id: string;
  name: string;
  checked: boolean;
}

export function Home() {
  const [taskList, setTaskList] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<string[]>([]);

  return (
    <>
      <header className={styles.headerBackground}>
        <div className={styles.contentImageLogo}>
          <img className={styles.imgLogo} src={Logo} alt="Logo" />
        </div>
      </header>
      <div className={styles.bodyBackground}>
        <div className="App">
          <NewTask setTaskList={setTaskList} taskList={taskList} />
          <TaskStatus selectedTask={selectedTask} taskList={taskList} />
          <Tasks
            selectedTask={selectedTask}
            setSelectedTask={setSelectedTask}
            setTaskList={setTaskList}
            taskList={taskList}
          />
        </div>
      </div>
    </>
  );
}
