import React, { FunctionComponent, useRef, useState } from "react";
import { CarouselControl, CarouselControlProps } from "./carousel-controls";
import { CarouselItem } from "./carousel-item/carousel-item.component";
import {
  CarouselContext,
  CarouselControllerContext,
  CarouselControllerContextConstructor,
  CarouselState,
  createController,
  DefaultCarouselControllerContext,
} from "./carousel.context";
import { CarouselRenderer } from "./renderers";

export type CarouselProps = {
  controls?: FunctionComponent<CarouselControlProps>[];
  controller?: CarouselControllerContext | CarouselControllerContextConstructor;
};

export const Carousel: FunctionComponent<CarouselProps> = ({
  controller,
  children,
}) => {
  const ref = useRef(
    controller && typeof controller === "function"
      ? new controller()
      : controller || new DefaultCarouselControllerContext()
  );

  const [state, setState] = useState<CarouselState>({ action: "none" });

  const renderer =
    children instanceof Array
      ? (children as React.ReactElement[]).find(
          ({ type }) =>
            typeof type === "function" &&
            type.prototype instanceof CarouselRenderer
        )
      : null;

  if (!renderer) {
    throw Error(`Carousel renderer must be specified`);
  }

  const items =
    children instanceof Array
      ? (children as React.ReactElement[])
          .filter(({ type }) => type === CarouselItem)
          .map((item, index) =>
            React.cloneElement(item, { key: `slide-${index}` })
          )
      : [];

  const controls =
    children instanceof Array
      ? (children as React.ReactElement[])
          .filter(
            ({ type }) =>
              typeof type === "function" &&
              type.prototype instanceof CarouselControl
          )
          .map((item, index) =>
            React.cloneElement(item, { key: `control-${index}` })
          )
      : [];

  const carouselController = createController(ref.current, state, setState);

  carouselController.setItems(items as any);

  return (
    <CarouselContext.Provider value={carouselController}>
      <div className="carousel-container">
        {renderer}

        <div className="carousel-controls-container">{controls}</div>
      </div>
    </CarouselContext.Provider>
  );
};
