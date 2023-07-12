import React from "react";
import { BrowserRouter } from "react-router-dom";
import NavRoutes from "@routes/index";
import styles from "./styles.module.scss";
import "./colors.scss";

const App: React.FC = () => {
  return (
    <div className={styles.app}>
      <BrowserRouter>
        <NavRoutes />
      </BrowserRouter>
    </div>
  );
}

export default App;
