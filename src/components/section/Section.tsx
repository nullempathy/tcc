import { ReactNode } from "react";
import styles from "./section.module.css";

interface ISection {
  children: ReactNode[];
}

export function Section({ children }: ISection) {
  const midIndex = Math.ceil(children.length / 2);
  
  const firstColumn = children.slice(0, midIndex);
  const secondColumn = children.slice(midIndex);

  return (
    <div className={styles.section}>
      <div className={styles.column}>
        {}
        {firstColumn}
      </div>
      <div className={styles.column}>
        {}
        {secondColumn}
      </div>
    </div>
  );
}
