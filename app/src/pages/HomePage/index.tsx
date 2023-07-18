import React from "react";
import { MainLayout } from "@layouts/index";
import CustomHeader from "@layouts/MainLayout/components/CustomHeader";
import styles from "../styles.module.scss";

const HomePage: React.FC = () => {
  return (
    <MainLayout>
      <CustomHeader />
      <div className={styles.page_content}>
    
      </div>
    </MainLayout>
  );
}

export default HomePage;
