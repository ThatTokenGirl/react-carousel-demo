import React, { FunctionComponent } from "react";
import { Carousel, CarouselProps } from "./carousel.component";
import { CarouselRenderer2d } from "./renderers";
export * from "./carousel-item/carousel-item.component";
export * from "./carousel.component";
export * from "./carousel-controls";
export * from "./renderers";

export const Carousel2d: FunctionComponent<CarouselProps> = ({
  controller,
  children,
}) => {
  const nodes = [
    <CarouselRenderer2d></CarouselRenderer2d>,
    ...React.Children.toArray(children),
  ];

  return <Carousel controller={controller}>{nodes}</Carousel>;
};
