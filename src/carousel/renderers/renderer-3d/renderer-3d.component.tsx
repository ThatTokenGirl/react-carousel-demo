import React from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { CarouselRenderer } from "../carousel-renderer";
import "./renderer-3d.animation.scss";
import styles from "./renderer-3d.module.scss";

export type CarouselRenderer3dProps = {
  displayable?: number;
};

export class CarouselRenderer3d extends CarouselRenderer<
  CarouselRenderer3dProps
> {
  private _positionZero = 0;

  render() {
    const controller = this.context;
    const { displayable = 5 } = this.props;

    if (this.context.action === "forward") {
      this._positionZero++;
    } else if (this.context.action === "back") {
      this._positionZero--;
    }

    const transitions = createOrder(this._positionZero, displayable)
      .map((offset) => ({
        offset,
        displayPosition:
          displayable % 2 === 1 ? offset : offset <= 0 ? offset - 1 : offset,
        child: controller.itemAtOffset(offset),
      }))
      .filter((x) => x.child)
      .filter(
        ({ child }, index, array) =>
          array.findIndex((x) => x.child.key === child.key) === index
      )
      .map(({ displayPosition, child }) => {
        const baseSize = 1 - (displayable - 1) / displayable / 2;
        const slideSize =
          baseSize * (1 - Math.abs(displayPosition) / displayable);
        const numberOfSideItems = Math.floor(displayable / 2);

        let translate = 0;
        if (displayable !== 0 && displayable % 2 === 0) {
          const centerWidthPercentage = 1 / (displayable * 2);
          const startTranslate = baseSize - centerWidthPercentage;

          translate =
            (startTranslate * (numberOfSideItems - Math.abs(displayPosition))) /
            numberOfSideItems;
        } else if (displayable % 2 === 1) {
          translate =
            ((1 - baseSize) * (numberOfSideItems - Math.abs(displayPosition))) /
            numberOfSideItems;
        }

        return (
          <CSSTransition
            in={true}
            timeout={500}
            key={child.key}
            classNames="slide"
          >
            <div
              className={styles.carousel_3d_slide}
              key={`${child.key}-container`}
              style={{
                zIndex: displayable - Math.abs(displayPosition),
                transformOrigin:
                  displayPosition < 0
                    ? "left"
                    : displayPosition > 0
                    ? "right"
                    : "center",
                transform: `
                  rotateY(${
                    (displayPosition * -45) / (Math.abs(displayPosition) || 1)
                  }deg)
                  scale(${slideSize})
                  translateX(${
                    -100 *
                    (displayPosition / Math.abs(displayPosition || 1)) *
                    translate
                  }%)
              `,
              }}
            >
              {child}
            </div>
          </CSSTransition>
        );
      });

    return (
      <TransitionGroup
        className={`carousel_3d ${styles.carousel_3d} ${controller.action}`}
      >
        {transitions}
      </TransitionGroup>
    );
  }
}

function createOrder(zeroPosition: number, displayable: number) {
  const startIndex = positiveMod(zeroPosition, displayable);
  const maxOffset = Math.floor(displayable / 2);

  const order = Array(displayable);
  order[startIndex] = 0;

  for (let i = 1; i <= maxOffset; i++) {
    const leftIndex = positiveMod(startIndex - i, displayable);
    const rightIndex = positiveMod(startIndex + i, displayable);

    order[leftIndex] = i * -1;
    order[rightIndex] = i;
  }

  return order;
}

function positiveMod(x: number, divisor: number) {
  return ((x % divisor) + divisor) % divisor;
}
