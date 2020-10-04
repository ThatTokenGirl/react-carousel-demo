import { Component, ContextType, ReactNode } from "react";
import { CarouselContext } from "../carousel.context";

export type CarouselRendererProps = {};

export abstract class CarouselRenderer extends Component<
  CarouselRendererProps
> {
  static contextType = CarouselContext;

  context!: ContextType<typeof CarouselContext>;

  abstract render(): ReactNode;
}
