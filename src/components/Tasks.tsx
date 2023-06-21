import styles from "./Tasks.module.css";
import { Trash, Check, NotePencil, CheckSquare } from "phosphor-react";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { EmptyTask } from "./EmptyTask";
import {
  Button,
  Text,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
  ModalOverlay,
} from "@chakra-ui/react";

interface TaskProps {
  taskList: Array<{ id: string; name: string; checked: boolean }>;
  setTaskList: React.Dispatch<
    React.SetStateAction<Array<{ id: string; name: string; checked: boolean }>>
  >;
  selectedTask: string[];
  setSelectedTask: React.Dispatch<React.SetStateAction<string[]>>;
}

export function Tasks({
  setTaskList,
  taskList,
  selectedTask,
  setSelectedTask,
}: TaskProps) {
  const [editedTask, setEditedTask] = useState<{
    id: string;
    name: string;
  } | null>(null);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [taskToDeleteId, setTaskToDeleteId] = useState<string | null>(null);

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

  function handleTaskStatus(taskId: string) {
    if (selectedTask.includes(taskId)) {
      setSelectedTask(selectedTask.filter((item) => item !== taskId));
    } else {
      setSelectedTask([...selectedTask, taskId]);
    }
  }

  function deleteTask(taskId: string) {
    if (editedTask && editedTask.id === taskId) {
      toast.error("You cannot delete a task while it is being edited.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }

    const isTaskSelected = selectedTask.includes(taskId);

    if (!isTaskSelected) {
      setTaskToDeleteId(taskId);
      onOpen();
    } else {
      deleteConfirmedTask(taskId);
    }
  }

  function deleteConfirmedTask(taskId: string) {
    const updatedTaskList = taskList.filter((task) => task.id !== taskId);
    setTaskList(updatedTaskList);
    setSelectedTask(selectedTask.filter((item) => item !== taskId));
  }

  function handleEditTask(taskId: string, taskName: string) {
    setEditedTask({ id: taskId, name: taskName });
  }

  function handleSaveTask() {
    if (editedTask) {
      if (editedTask.name.trim() === "") {
        toast.warn("You cannot save a task without giving it a name.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        return;
      }
  
      const updatedTaskList = taskList.map((task) => {
        if (task.id === editedTask.id) {
          return {
            ...task,
            name: editedTask.name,
          };
        }
        return task;
      });
      setTaskList(updatedTaskList);
      setEditedTask(null);
    }
  }

  function handleConfirmDelete() {
    if (taskToDeleteId) {
      deleteConfirmedTask(taskToDeleteId);
      onClose();
    }
  }

  return (
    <>
      {taskList.length > 0 ? (
        <div>
          {taskList.map((task) => {
            const isChecked = selectedTask.includes(task.id);
            const isEditing = editedTask?.id === task.id;

            return (
              <div key={task.id} className={styles.taskContent}>
                <button
                  className={
                    isChecked
                      ? styles.taskContentButtonClick
                      : styles.taskContentButton
                  }
                  onClick={() => handleTaskStatus(task.id)}
                >
                  <Check
                    className={
                      isChecked ? styles.checkIconActive : styles.checkIcon
                    }
                    color="#fafafa"
                  />
                </button>
                {isEditing ? (
                  <>
                    <p
                      className={
                        `${isChecked ? styles.taskContentPActive : styles.taskContentP} ${isEditing ? styles.editing : ''}`
                      }
                      contentEditable
                      onBlur={handleSaveTask}
                      suppressContentEditableWarning
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleSaveTask();
                        }
                      }}
                      onInput={(e) => {
                        setEditedTask({
                          id: task.id,
                          name: e.currentTarget.textContent || "",
                        });
                      }}
                      ref={(el) => el && isEditing && el.focus()}
                    >
                      {task.name}
                    </p>
                    <CheckSquare
                      size={20}
                      color="#808080"
                      weight="regular"
                      onClick={() => handleEditTask(task.id, task.name)}
                      style={{
                        cursor: "pointer",
                      }}
                    />
                  </>
                ) : (
                  <>
                    <p
                      className={
                        isChecked
                          ? styles.taskContentPActive
                          : styles.taskContentP
                      }
                    >
                      {task.name}
                    </p>
                  
                    <NotePencil
                      size={20}
                      color="#808080"
                      weight="regular"
                      onClick={() => handleEditTask(task.id, task.name)}
                      style={{
                        cursor: "pointer",
                      }}
                    />
                  </>
                )}
                <Trash
                  size={20}
                  color="#808080"
                  weight="regular"
                  onClick={() => deleteTask(task.id)}
                  style={{
                    cursor: "pointer",
                  }}
                />
              </div>
            );
          })}
        </div>
      ) : (
        <EmptyTask />
      )}

      <Modal isCentered isOpen={isOpen} size={"sm"} onClose={onClose}>
        <ModalOverlay
          bg="blackAlpha.300"
          backdropFilter="blur(10px) hue-rotate(90deg)"
        />
        <ModalContent background="#262626">
          <ModalHeader color="white">Are you sure about that?</ModalHeader>
          <ModalCloseButton color="white"/>
          <ModalBody>
            <Text color="white">
              Are you sure you want to delete your task without completing it?
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme="red" color="white" onClick={handleConfirmDelete}>
              Delete Task
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
