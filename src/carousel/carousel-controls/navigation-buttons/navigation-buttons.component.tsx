import React, { FunctionComponent } from "react";
import { CarouselControlProps } from "../carousel-control";
import styles from "./navigation-buttons.module.scss";

export const CarouselNavigationButtons: FunctionComponent<CarouselControlProps> = ({
  controller,
  children,
}) => {
  const buttons: any[] = [];

  if (controller.hasPrevious) {
    buttons.push(
      <button
        key="previous"
        className={styles.navigation_previous}
        onClick={() => controller.previous()}
      >
        {"<- Previous"}
      </button>
    );
  }

  if (controller.hasNext) {
    buttons.push(
      <button
        key="next"
        className={styles.navigation_next}
        onClick={() => controller.next()}
      >
        {"Next ->"}
      </button>
    );
  }

  return (
    <div className={styles.navigation_container}>
      {children}

      <div className={styles.navigation_buttons}>{buttons}</div>
    </div>
  );
};
