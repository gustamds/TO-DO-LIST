import styles from "./NewTask.module.css";
import { v4 as uuidv4 } from "uuid";
import { PlusCircle } from "phosphor-react";
import { ChangeEvent, useState, KeyboardEvent } from "react";
import { Button, Input, InputGroup, InputRightElement } from "@chakra-ui/react";

interface Task {
  id: string;
  name: string;
  checked: boolean; // Incluída a propriedade 'checked'
}

interface NewTaskProps {
  setTaskList: React.Dispatch<React.SetStateAction<Task[]>>;
  taskList: Task[];
}

export function NewTask({ setTaskList, taskList }: NewTaskProps) {
  const [taskName, setTaskName] = useState("");

  function handleChangeTaskName(event: ChangeEvent<HTMLInputElement>) {
    setTaskName(event.target.value);
  }

  function createNewTask() {
    if (taskName.trim() === "") {
      return;
    }

    setTaskList([
      ...taskList,
      {
        id: uuidv4().toString(),
        name: taskName,
        checked: false,
      },
    ]);

    setTaskName("");
  }

  function handleKeyPress(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      createNewTask();
    }
  }

  return (
    <div className={styles.contentNewTask}>
      <InputGroup>
        <Input
          className={styles.contentNewTaskInput}
          type="text"
          placeholder="Add a new task"
          onChange={handleChangeTaskName}
          onKeyPress={handleKeyPress}
          value={taskName}
        />
        <InputRightElement className={styles.contentNewTaskButtonRightElement}>
          <Button
            className={styles.contentNewTaskButton}
            onClick={createNewTask}
            isDisabled={!taskName}
            rightIcon={<PlusCircle size={16} />}
          >
            Add Task
          </Button>
        </InputRightElement>
      </InputGroup>
    </div>
  );
}