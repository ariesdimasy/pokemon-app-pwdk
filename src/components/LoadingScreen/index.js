import React from "react";
import { Spin } from "antd";

import style from "./index.module.css";

export default function LoadingScreen() {
  return (
    <div className={style["loading-screen"]}>
      <Spin />
    </div>
  );
}
