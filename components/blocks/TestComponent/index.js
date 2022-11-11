import { useRef } from "react";

import styles from './TestComponent.module.css';

const TestComponent = ({ text }) => {
  const ref = useRef();

  const uploadFile = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('files', ref.current?.files[0]);

    const res = await fetch('http://localhost:1337/api/upload', {
        method: 'post',
        body: formData
    });
  }

  return (
    <>
    <div className={styles.wrapper}>
      <h1>{text}</h1>      
    </div>
    <form onSubmit={(e) => uploadFile(e)}>
      <input type="file" name="files" ref={ref}/>
      <input type="submit" value="Submit" />
    </form>
    </>
  );
};

TestComponent.defaultProps = {};

export default TestComponent;
