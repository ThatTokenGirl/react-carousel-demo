import React, { FunctionComponent } from "react";

import styles from "./carousel-item.module.scss";

export const CarouselItem: FunctionComponent = ({ children }) => (
  <div className={styles["carousel-item"]}>{children}</div>
);
