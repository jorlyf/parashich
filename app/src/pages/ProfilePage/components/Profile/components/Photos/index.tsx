import React from "react";
import { useTranslation } from "react-i18next";
import DefaultAvatar from "@public/DefaultAvatar.jpg";
import styles from "./styles.module.scss";

interface PhotosProps {
  photos: any[];
}

interface IPhoto {
  id: string;
  url: string | null;
}

const Photos: React.FC<PhotosProps> = () => {

  const { t } = useTranslation();

  const photos: IPhoto[] = [
    {
      id: "1",
      url: null
    },
    {
      id: "2",
      url: null
    },
    {
      id: "3",
      url: null
    }
  ];

  return (
    <div className={styles.photos}>
      <span className={styles.header}>{t("Photos")}</span>

      <ul className={styles.list}>
        {photos.map(photo => (
          <li key={photo.id}>
            <img src={photo.url ?? DefaultAvatar} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Photos;
