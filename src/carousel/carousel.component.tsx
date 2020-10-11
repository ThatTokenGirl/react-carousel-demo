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
  const externalControllerRef = useRef<CarouselProps['controller']>(undefined);
  
  const activeControllerRef = useRef<CarouselControllerContext | undefined>(undefined);
  activeControllerRef.current = getOrCreateController({
    current: activeControllerRef.current,
    previousExternal: externalControllerRef.current,
    nextExternal: controller
  });

  externalControllerRef.current = controller;

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

  const carouselController = createController(activeControllerRef.current!, state, setState);

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

function getOrCreateController(opt: {
  current: CarouselControllerContext | undefined,
  previousExternal: CarouselProps['controller'], 
  nextExternal: CarouselProps['controller']
}) {
  const { current, nextExternal } = opt;
  if(hasChanged(opt)) {
    return nextExternal && typeof nextExternal === "function"
    ? new nextExternal()
    : nextExternal || new DefaultCarouselControllerContext();  
  }

  return current;
}

function hasChanged({ current, previousExternal, nextExternal }: {
  current: CarouselControllerContext | undefined,
  previousExternal: CarouselProps['controller'], 
  nextExternal: CarouselProps['controller']
}) {
  return !current || (!previousExternal && nextExternal) || (previousExternal !== nextExternal);
}