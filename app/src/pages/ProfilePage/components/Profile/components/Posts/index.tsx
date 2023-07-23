import React from "react";
import styles from "./styles.module.scss";

interface PostsProps {
  posts: any[];
}

const Posts: React.FC<PostsProps> = ({ posts }) => {

  const a = new Array(10).fill(null);

  return (
    <div className={styles.posts}>
      {a.map((_nothing, index) => (
        <div key={index}>
          ЭТО ПОСТ
        </div>
      ))}
    </div>
  );
}

export default Posts;
