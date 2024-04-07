import Link from "next/link";
import Image from "next/image";
import styles from "./postcard.module.css";
import { truncateContent } from "@/lib/utils";

const removeHtmlTags = (str) => {
  return str.replace(/<[^>]*>/g, " ");
};

const PostCard = ({ item }) => {
  return (
    <div className={styles.card}>
      <div className={styles.imgContainer}>
        <Image
          src={item?.img}
          alt="Post-Img"
          fill
          sizes="100vw"
          className="img-cover"
        />
      </div>
      <div>
        <span className={styles.date}>
          {new Date(item.updatedAt).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </span>
        <h6 className={styles.title} title={item?.title}>
          {truncateContent(item?.title, 45)}
        </h6>
        <p className={styles.desc}>
          {truncateContent(removeHtmlTags(item.content), 70)}
        </p>
        <Link href={`/blogs/${item?.slug}`} className="link">
          READ MORE
        </Link>
      </div>
    </div>
  );
};

export default PostCard;
