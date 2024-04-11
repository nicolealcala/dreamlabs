import styles from "./postcard.module.css";

const Skeleton = () => {
  return (
    <div className={`placeholder-wave ${styles.card}`}>
      <div className={`placeholder ${styles.imgContainer}`}></div>
      <span className={`placeholder w-25 rounded-1 ${styles.date}`}></span>
      <div className={`placeholder rounded-2 ${styles.skeletonTitle}`}></div>
      <div className={`placeholder rounded-2 ${styles.skeletonDesc}`}></div>
      <div className={`placeholder rounded-2 ${styles.skeletonDesc}`}></div>
      <div className={`placeholder rounded-2 ${styles.skeletonLink}`}></div>
    </div>
  );
};

export default Skeleton;
