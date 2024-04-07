import { getUser } from "@/lib/data";
import { truncateContent, optionsWithTime } from "@/lib/utils";
import Image from "next/image";
import UpdatedDate from "../date/UpdatedDate";

const Author = async ({ blog }) => {
  // FETCH DATA WITHOUT API
  const user = await getUser(blog?.userId);

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
      <div className="d-flex w-auto flex-column justify-content-center">
        <h6 className="txt-weight-mid my-0">
          {truncateContent(user?.username, 20)}
        </h6>
        <p className="txt-color-soft txt-size-sm my-0">
          <UpdatedDate utcDate={blog?.updatedAt} options={optionsWithTime} />
          {blog?.createdAt.getTime() !== blog?.updatedAt.getTime() && (
            <span> (Edited)</span>
          )}
        </p>
      </div>
    </div>
  );
};

export default Author;
