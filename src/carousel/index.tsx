import React, { FunctionComponent, PropsWithChildren } from "react";
import { Carousel, CarouselProps } from "./carousel.component";
import {
  CarouselRenderer2d,
  CarouselRenderer3d,
  CarouselRendererProps,
} from "./renderers";
export * from "./carousel-controls";
export * from "./carousel-item/carousel-item.component";
export * from "./carousel.component";
export * from "./renderers";

export const Carousel2d = createCarousel(CarouselRenderer2d);
export const Carousel3d = createCarousel(CarouselRenderer3d);

function createCarousel<RProps extends CarouselRendererProps>(
  Renderer: React.ComponentType<RProps>
): FunctionComponent<RProps> {
  return ({
    controller,
    children,
    ...rendererProps
  }: PropsWithChildren<RProps & CarouselProps>) => {
    const nodes = [
      <Renderer key="renderer" {...(rendererProps as RProps)}></Renderer>,
      ...React.Children.toArray(children),
    ];

    return <Carousel controller={controller}>{nodes}</Carousel>;
  };
}
