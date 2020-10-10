import { Component, ContextType, ReactNode } from "react";
import { CarouselContext } from "../carousel.context";

export type CarouselRendererProps = {};

export abstract class CarouselRenderer<
  T extends CarouselRendererProps = CarouselRendererProps
> extends Component<T> {
  static contextType = CarouselContext;

  context!: ContextType<typeof CarouselContext>;

  abstract render(): ReactNode;
}
