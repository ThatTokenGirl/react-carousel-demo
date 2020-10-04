import React from "react";
import { CarouselControl } from "../carousel-control";
import styles from "./navigation-buttons.module.scss";

export class CarouselNavigationButtons extends CarouselControl {
  render() {
    const controller = this.context;
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
        {this.props.children}

        <div className={styles.navigation_buttons}>{buttons}</div>
      </div>
    );
  }
}
