import React from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { CarouselRenderer } from "../carousel-renderer";
import "./renderer-2d.animations.scss";
import styles from "./renderer-2d.module.scss";

export class CarouselRenderer2d extends CarouselRenderer {
  render() {
    const controller = this.context;
    const currentChild = controller.itemAtOffset(0);

    return (
      <TransitionGroup
        className={`carousel_2d ${styles.carousel_2d} ${
          controller.action === null ? "forward" : controller.action
        }`}
      >
        <CSSTransition timeout={500} classNames="slide" key={currentChild.key}>
          <div className={`carousel-2d-slide ${styles.carousel_2d_slide}`}>
            {currentChild}
          </div>
        </CSSTransition>
      </TransitionGroup>
    );
  }
}
