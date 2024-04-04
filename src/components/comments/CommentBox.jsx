import { getUser } from "@/lib/data";
import Image from "next/image";
import styles from "./comment.module.css";

const CommentBox = async ({ session, comment, poster }) => {
  const user = await getUser(comment?.userId);

  return (
    <div className="d-flex commentForm" data-bs-theme="dark">
      <Image
        src={user?.img}
        width={35}
        height={35}
        alt="Commentor Image"
        className="rounded-pill"
      />
      <div className="d-flex flex-column w-100 ms-3">
        <div className="col-12 form-control commentBox border-0">
          <p className="mb-1 txt-size-small ">
            <span className="txt-weight-mid">
              {user?.username}
              {poster === comment.userId && <span> &#x2022; Author</span>}
            </span>
          </p>
          <p className="mb-1 txt-weight-light">{comment?.content}</p>
        </div>
        {session?.user.id === comment.userId && (
          <div className="d-flex align-items-center mt-1">
            <button
              className="bg-transparent border-0 txt-size-small me-2"
              id={styles.edit}
            >
              Edit
            </button>
            <button
              className="bg-transparent border-0 txt-size-small"
              id={styles.delete}
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentBox;
