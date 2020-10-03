import React, {
  Dispatch,
  FunctionComponent,
  SetStateAction,
  useRef,
  useState,
} from "react";
import { CarouselControlProps } from "./carousel-controls";
import { CarouselItem } from "./carousel-item/carousel-item.component";
import {
  CarouselController,
  CarouselControllerContext,
  CarouselControllerContextConstructor,
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

  const [state, setState] = useState<{
    action: null | "previous" | "next";
    currentIndex: number;
    lastCurrentIndex: number | null;
  }>({
    action: null,
    lastCurrentIndex: null,
    currentIndex: ref.current.currentIndex,
  });

  const items =
    children instanceof Array
      ? (children as React.ReactElement[]).filter(
          ({ type }) => type === CarouselItem
        )
      : [];

  ref.current.setItems(items as any);

  const carouselController = createController(ref.current, state, setState);

  const Display = <Renderer controller={carouselController}>{items}</Renderer>;
  const rendered =
    controls && controls.length
      ? controls.reduceRight(
          (element, Control) => (
            <Control controller={carouselController}>{element}</Control>
          ),
          Display
        )
      : Display;

  return rendered;
};

function createController(
  outer: CarouselControllerContext,
  {
    action,
    lastCurrentIndex,
  }: {
    action: "next" | "previous" | null;
    currentIndex: number;
    lastCurrentIndex: number | null;
  },
  update: Dispatch<
    SetStateAction<{
      action: "next" | "previous" | null;
      currentIndex: number;
      lastCurrentIndex: number | null;
    }>
  >
): CarouselController {
  return {
    action,
    lastCurrentIndex,
    hasNext: outer.hasNext,
    hasPrevious: outer.hasPrevious,
    previousIndex: outer.previousIndex,
    currentIndex: outer.currentIndex,
    nextIndex: outer.nextIndex,
    next() {
      const lastCurrentIndex = outer.currentIndex;
      outer.next();
      update({
        action: "next",
        currentIndex: outer.currentIndex,
        lastCurrentIndex,
      });
    },
    previous() {
      const lastCurrentIndex = outer.currentIndex;
      outer.previous();
      update({
        action: "previous",
        currentIndex: outer.currentIndex,
        lastCurrentIndex,
      });
    },
    setItems(items) {
      const { lastCurrentIndex } = this;
      outer.setItems(items);
      update({
        action: null,
        currentIndex: outer.currentIndex,
        lastCurrentIndex,
      });
    },
  };
}
