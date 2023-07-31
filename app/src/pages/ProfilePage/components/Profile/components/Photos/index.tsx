import React from "react";
import DefaultAvatar from "@public/DefaultAvatar.jpg";
import styles from "./styles.module.scss";
import { BASE_URL_DATA } from "@http/api";

interface PhotosProps {
  photos: IPhoto[];
}

interface IPhoto {
  id: string;
  url?: string;
}

const Photos: React.FC<PhotosProps> = ({ photos }) => {

  return (
    <div className={styles.photos}>
      <div className={styles.list}>
        {photos.slice(0, 3).map(photo => (
          <div key={photo.id}>
            <img src={photo.url ? `${BASE_URL_DATA}\\${photo.url}` : DefaultAvatar} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Photos;
