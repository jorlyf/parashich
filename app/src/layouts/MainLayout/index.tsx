import React from "react";
import Footer from "./components/Footer";
import LeftMenu from "./components/LeftMenu";
import useMainLayout from "./hooks/useMainLayout";
import styles from "./styles.module.scss";

interface MainLayoutProps {
  children: React.ReactNode
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {

  const {
    isOpenLeftMenu,
    toggleLeftMenu,
    closeLeftMenu
  } = useMainLayout();

  return (
    <div className={styles.main_layout}>
      <div className={styles.content}>
        <LeftMenu
          isOpen={isOpenLeftMenu}
          close={closeLeftMenu}
        />
        {children}
      </div>
      <Footer
        isOpenLeftMenu={isOpenLeftMenu}
        toggleLeftMenu={toggleLeftMenu}
      />
    </div>
  );
}

export default MainLayout;
