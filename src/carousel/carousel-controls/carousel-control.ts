import { Component, ContextType, ReactNode } from "react";
import { CarouselContext } from "../carousel.context";

export type CarouselControlProps = {};

export abstract class CarouselControl extends Component<CarouselControlProps> {
  static contextType = CarouselContext;

  context!: ContextType<typeof CarouselContext>;

  abstract render(): ReactNode;
}
