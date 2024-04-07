import { getUser } from "@/lib/data";
import { truncateContent, options } from "@/lib/utils";
import Image from "next/image";

const Author = async ({ blog }) => {
  // FETCH DATA WITHOUT API
  const user = await getUser(blog?.userId);

  const createdAt = new Date(blog?.createdAt);
  const updatedAt = new Date(blog?.updatedAt);
  const formattedUpdatedAt = new Intl.DateTimeFormat("en-US", options).format(
    updatedAt
  );
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
          {formattedUpdatedAt}
          {createdAt.getTime() !== updatedAt.getTime() && (
            <span> (Edited)</span>
          )}
        </p>
      </div>
    </div>
  );
};

export default Author;
