import { getUser } from "@/lib/data";
import Image from "next/image";
import EditBtn from "./EditBtn";
import { createMarkup } from "@/lib/utils";
import DeleteBtn from "./DeleteBtn";

const CommentBox = async ({ session, comment, poster }) => {
  const user = await getUser(comment?.userId);

  return (
    <div className="d-flex commentForm mb-3" data-bs-theme="dark">
      <Image
        src={user?.img}
        width={35}
        height={35}
        alt="Commentor Image"
        className="rounded-pill"
      />
      <div className="d-flex flex-column w-auto ms-3">
        <div className="form-control commentBox border-0">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <div className="me-3">
              <p className="txt-size-mid my-0 txt-weight-mid">
                {user?.username}
                {poster === comment.userId && (
                  <span className="txt-weight-normal txt-color-mid txt-size-small">
                    {" "}
                    &#x2022; Author
                  </span>
                )}
              </p>
            </div>
            <div>
              <p className="txt-size-small my-0">
                {new Date(comment.updatedAt).toLocaleDateString("en-US", {
                  hour: "numeric",
                  minute: "numeric",
                })}
                {comment.createdAt.getTime() !==
                  comment.updatedAt.getTime() && <span> (Edited)</span>}
              </p>
            </div>
          </div>
          <div
            className="mb-1 txt-weight-light"
            dangerouslySetInnerHTML={createMarkup(comment?.content)}
          ></div>
        </div>
        {session?.user.id === comment.userId && (
          <div className="d-flex align-items-center mt-1">
            <EditBtn comment={comment} />
            <DeleteBtn commentId={comment?._id} />
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentBox;
