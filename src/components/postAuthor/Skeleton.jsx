function Skeleton() {
  return (
    <div className="d-flex ">
      <div
        className="rounded-pill placeholder placeholder-wave"
        style={{ width: "40px", height: "40px" }}
      ></div>
      <div className="d-flex flex-column ms-3">
        <div
          className="rounded-1 placeholder placeholder-wave"
          style={{ width: "80px", height: "10px" }}
        ></div>
        <div
          className="rounded-1 mt-1 placeholder placeholder-wave"
          style={{ width: "150px", height: "10px" }}
        ></div>
      </div>
    </div>
  );
}

export default Skeleton;
