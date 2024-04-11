const Skeleton = () => {
  return (
    <div className="d-flex">
      <div
        className="rounded-pill placeholder placeholder-wave"
        style={{ width: "35px", height: "35px" }}
      ></div>

      <div
        className="ms-2 rounded-2 placeholder placeholder-wave"
        style={{ width: "250px", height: "80px" }}
      ></div>
    </div>
  );
};

export default Skeleton;
