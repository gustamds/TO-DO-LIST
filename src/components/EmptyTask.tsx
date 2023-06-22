import styles from "./EmptyTask.module.css";

import ListEmpty from "../assets/Clipboard.png";

export function EmptyTask() {
  return (
    <div className={styles.contentMessage}>
      <img className={styles.imgEmpty} src={ListEmpty} alt="Lista Vazia" />
      <p className={styles.paragraphBold}>
        You don't have tasks registered yet
      </p>
      <p className={styles.paragraphLight}>
        Create tasks and organize your to-do items
      </p>
    </div>
  );
}
