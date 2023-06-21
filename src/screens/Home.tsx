import styles from "./Home.module.css";
import { useState, useEffect } from 'react';
import Logo from '../assets/Logo.png';
import { NewTask } from '../components/NewTask';
import { TaskStatus } from '../components/TaskStatus';
import { Tasks } from "../components/Tasks";

interface Task {
  id: string;
  name: string;
  checked: boolean;
}

export function Home() {
  const [taskList, setTaskList] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<string[]>([]);

  useEffect(() => {
    const storedTaskList = localStorage.getItem("taskList");
    const storedSelectedTask = localStorage.getItem("selectedTask");

    if (storedTaskList) {
      setTaskList(JSON.parse(storedTaskList));
    }

    if (storedSelectedTask) {
      setSelectedTask(JSON.parse(storedSelectedTask));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("taskList", JSON.stringify(taskList));
  }, [taskList]);

  useEffect(() => {
    localStorage.setItem("selectedTask", JSON.stringify(selectedTask));
  }, [selectedTask]);

  return (
    <>
      <header className={styles.headerBackground}>
        <div className={styles.contentImageLogo}>
          <img className={styles.imgLogo} src={Logo} alt="Logo" />
        </div>
      </header>
      <body className={styles.bodyBackground}>
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
      </body>
    </>
  );
}