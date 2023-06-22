import styles from "./TaskStatus.module.css";

interface TaskStatusProps {
  taskList: Array<{ id: string; name: string }>;
  selectedTask: string[];
}

export function TaskStatus({ taskList, selectedTask }: TaskStatusProps) {
  return (
    <div className={styles.contentTaskStatus}>
      <div className={styles.contentTaskStatusCreated}>
        <p className={styles.contentTaskStatusCreatedP}>Tasks Created</p>
        <div className={styles.contentTaskStatusCreatedCounter}>
          {taskList.length}
        </div>
      </div>
      <div className={styles.contentTaskStatusDone}>
        <p className={styles.contentTaskStatusDoneP}>Completed</p>
        <div className={styles.contentTaskStatusDoneCounter}>
          {selectedTask.length} of {taskList.length}
        </div>
      </div>
    </div>
  );
}
