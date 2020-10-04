import React, { FunctionComponent, useRef, useState } from "react";
import { CarouselControlProps } from "./carousel-controls";
import { CarouselItem } from "./carousel-item/carousel-item.component";
import {
  CarouselContext,
  CarouselControllerContext,
  CarouselControllerContextConstructor,
  CarouselState,
  createController,
  DefaultCarouselControllerContext,
} from "./carousel.context";
import { CarouselRendererProps } from "./renderers";

export type CarouselProps = {
  display: FunctionComponent<CarouselRendererProps>;
  controls?: FunctionComponent<CarouselControlProps>[];
  controller?: CarouselControllerContext | CarouselControllerContextConstructor;
};

export const Carousel: FunctionComponent<CarouselProps> = ({
  display: Renderer,
  controls,
  controller,
  children,
}) => {
  const ref = useRef(
    controller && typeof controller === "function"
      ? new controller()
      : controller || new DefaultCarouselControllerContext()
  );

  const [state, setState] = useState<CarouselState>({ action: "none" });

  const items =
    children instanceof Array
      ? (children as React.ReactElement[])
          .filter(({ type }) => type === CarouselItem)
          .map((item, index) =>
            React.cloneElement(item, { key: `slide-${index}` })
          )
      : [];

  const carouselController = createController(ref.current, state, setState);

  carouselController.setItems(items as any);

  const Display = <Renderer>{items}</Renderer>;
  const rendered =
    controls && controls.length
      ? controls.reduceRight(
          (element, Control) => <Control>{element}</Control>,
          Display
        )
      : Display;

  return (
    <CarouselContext.Provider value={carouselController}>
      {rendered}
    </CarouselContext.Provider>
  );
};
