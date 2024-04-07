import Image from "next/image";
import { EllipsisVertical } from "lucide-react";
import { getUser } from "@/lib/data";
import { createMarkup } from "@/lib/utils";
import DeleteBtn from "./DeleteBtn";
import EditBtn from "./EditBtn";
import UpdatedDate from "../date/UpdatedDate";

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
      <div className="d-flex flex-column w-auto ms-2">
        <div className="form-control commentBox border-0 p-0">
          <div
            className="mb-1 txt-weight-light mb-2 px-3 pt-3"
            dangerouslySetInnerHTML={createMarkup(comment?.content)}
          ></div>
          <hr className="my-0" />
          <div className="d-flex justify-content-between align-items-center p-2">
            <div className="me-3">
              <p className="txt-size-sm my-0 ">
                <em className="txt-color-yellow txt-weight-mid">
                  @{user?.username}
                </em>
                {poster === comment.userId && (
                  <span className="txt-weight-normal txt-color-mid txt-size-sm">
                    {" "}
                    &#x2022; Author
                  </span>
                )}
              </p>
            </div>
            <div className="d-flex align-items-center">
              <p className="txt-size-xs my-0 py-0">
                <UpdatedDate utcDate={comment?.updatedAt} />
                {comment.createdAt.getTime() !==
                  comment.updatedAt.getTime() && <span> (Edited)</span>}
              </p>

              {session?.user.id === comment.userId && (
                <div className="dropend" data-bs-theme="light">
                  <button
                    className="bg-transparent border-0 btn p-0 ms-1 d-flex align-items-center text-light"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <EllipsisVertical width={15} height={15} />
                  </button>
                  <ul className="dropdown-menu">
                    <li className="dropdown-item p-0">
                      <EditBtn comment={comment} />
                    </li>
                    <li className="dropdown-item p-0">
                      <DeleteBtn commentId={comment?._id} />
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentBox;
