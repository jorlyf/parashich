import React from "react";
import MainLayout from "@layouts/MainLayout";
import styles from "./styles.module.scss";

import "./colors.scss";

const App: React.FC = () => {
  return (
    <div className={styles.app}>
      <MainLayout>
        
      </MainLayout>
    </div>
  );
}

export default App;
