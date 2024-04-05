import { getUser } from "@/lib/data";
import Image from "next/image";
import { options } from "@/lib/utils";

const Author = async ({ userId, date }) => {
  // FETCH DATA WITHOUT API
  const user = await getUser(userId);

  return (
    <div className="row mx-0 mt-3 w-100 d-flex align-items-end">
      <div
        style={{
          position: "relative",
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          overflow: "hidden",
        }}
      >
        <Image
          src={user?.img}
          alt="Author Image"
          fill
          sizes="100vw"
          className="img-cover"
        />
      </div>
      <div className="col-8 d-flex flex-column justify-content-center">
        <h6 className="txt-weight-mid my-0">{user?.username}</h6>
        <p className="txt-color-soft txt-size-small my-0">
          {new Date(date).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </p>
      </div>
    </div>
  );
};

export default Author;
