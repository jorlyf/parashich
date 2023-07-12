import React from "react";
import { observer } from "mobx-react-lite";
import { BrowserRouter } from "react-router-dom";
import NavRoutes from "@routes/index";
import useStore from "@hooks/useStore";
import useTokenAuth from "@hooks/useTokenAuth";
import styles from "./styles.module.scss";
import "./colors.scss";

const App: React.FC = observer(() => {

  const { authStore } = useStore();

  useTokenAuth({ authStore });

  return (
    <div className={styles.app}>
      <BrowserRouter>
        <NavRoutes />
      </BrowserRouter>
    </div>
  );
});

export default App;
