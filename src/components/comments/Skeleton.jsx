const Skeleton = () => {
  return (
    <div className="d-flex">
      <div
        className="rounded-pill placeholder placeholder-wave"
        style={{ width: "35px", height: "35px" }}
      ></div>

      <div className="ms-2 d-flex flex-column">
        <div
          className="rounded-2 placeholder placeholder-wave"
          style={{ width: "250px", height: "50px" }}
        ></div>
        <div className="d-flex mt-2 justify-content-between">
          <div
            className="rounded-2 placeholder placeholder-wave"
            style={{ width: "40px", height: "10px" }}
          ></div>
          <div
            className="rounded-2 placeholder placeholder-wave"
            style={{ width: "200px", height: "10px" }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Skeleton;
