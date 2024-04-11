import styles from "../blog.module.css";

const Skeleton = () => {
  return (
    <div className="p-3 postBody">
      <div className={`placeholder placeholder-wave ${styles.postImg}`}></div>
      <div
        className={`placeholder placeholder-wave rounded-2 ${styles.skeletonTitle}`}
      ></div>

      <div className="d-flex">
        <div
          className={`placeholder placeholder-wave rounded-pill ${styles.skeletonImg}`}
        ></div>
      </div>
    </div>
  );
};

export default Skeleton;
