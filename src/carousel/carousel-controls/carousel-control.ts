import { Component, ContextType, ReactNode } from "react";
import { CarouselContext } from "../carousel.context";

export type CarouselControlProps = {};

export abstract class CarouselControl<
  P extends CarouselControlProps = CarouselControlProps
> extends Component<P> {
  static contextType = CarouselContext;

  context!: ContextType<typeof CarouselContext>;

  abstract render(): ReactNode;
}
