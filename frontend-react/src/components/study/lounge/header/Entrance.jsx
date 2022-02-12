import styles from "./StudyHeader.module.css";
import React, { useEffect, useState, useRef } from "react";

function Entrance() {
  const [isOpen, setIsOpen] = useState(true);
  const handleDoor = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className={styles.slide}>
      <div className={styles.slide_door}>dd</div>
    </div>
  );
}
export default Entrance;
