import Link from "next/link";
import Image from "next/image";
import styles from "./postcard.module.css";
import { truncateContent } from "@/lib/utils";
import UpdatedDate from "../date/UpdatedDate";

const removeHtmlTags = (str) => {
  return str.replace(/<[^>]*>/g, " ");
};

const PostCard = async ({ blog }) => {
  return (
    <div className={styles.card}>
      <div className={styles.imgContainer}>
        <Image
          src={blog?.img}
          alt="Post-Img"
          fill
          sizes="100vw"
          className="img-cover"
        />
      </div>
      <div>
        <span className={styles.date}>
          <UpdatedDate utcDate={blog?.updatedAt} options="date" />
        </span>
        <h6 className={styles.title} title={blog?.title}>
          {truncateContent(blog?.title, 45)}
        </h6>
        <p className={styles.desc}>
          {truncateContent(removeHtmlTags(blog.content), 70)}
        </p>
        <Link href={`/blogs/${blog?.slug}`} className="link">
          READ MORE
        </Link>
      </div>
    </div>
  );
};

export default PostCard;
