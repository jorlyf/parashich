import React from "react";
import LeftArrowIcon from "@public/images/LeftArrow.svg";
import CustomHeader from "@components/CustomHeader";
import styles from "./styles.module.scss";

interface HeaderProps {
  isOpenDialogList: boolean;
  openDialogList: () => void;
}

const Header: React.FC<HeaderProps> = ({ isOpenDialogList, openDialogList }) => {

  const handleClickLeftArrow = () => {
    openDialogList();
  }

  return (
    <CustomHeader>
      {!isOpenDialogList &&
        <img
          className={styles.open_dialog_list_icon}
          src={LeftArrowIcon}
          onClick={handleClickLeftArrow}
        />
      }
    </CustomHeader>
  );
}

export default Header;
