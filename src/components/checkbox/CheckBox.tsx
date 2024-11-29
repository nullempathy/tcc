import { useState, useEffect } from "react";
import styles from "./checkbox.module.css";
import Image from "next/image";
import verifyWhite from "../../img/verifyWhite.svg";
import verifyBrown from "../../img/verifyBrown.svg";

interface ICheckBox {
  value: string;
  id: string;
  storage: string;
  onChange: (id: string, checked: boolean) => void;
  checked: boolean;  // Recebe o estado de "checked" de fora
}

export function CheckBox(props: ICheckBox) {
  const [isChecked, setIsChecked] = useState(props.checked);

  useEffect(() => {
    setIsChecked(props.checked);  // Atualiza o estado local quando o estado externo mudar
  }, [props.checked]);

  function handleChecked(e: React.ChangeEvent<HTMLInputElement>) {
    const checked = e.target.checked;
    setIsChecked(checked);
    props.onChange(props.id, checked);
  }

  return (
    <div className={styles.body}>
      <div className={styles.checkbox}>
        <input 
          id={props.id} 
          type="checkbox" 
          onChange={handleChecked} 
          checked={isChecked} 
        />
        <label htmlFor={props.id} className={`${styles.newCheckBox} ${isChecked ? styles.checked : ''}`}>
          {isChecked ? <Image src={verifyWhite} alt=""/> : <Image src={verifyBrown} alt=""/>}
        </label>
      </div>
      <label htmlFor={props.id}>{props.value}</label>
    </div>
  );
}
