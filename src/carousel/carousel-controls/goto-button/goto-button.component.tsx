import React from "react";
import { CarouselProps } from "../../carousel.component";
import { CarouselControl } from "../carousel-control";

export type GotoButtonProps = CarouselProps & {
  gotoOffset: number;
  className?: string;
};

export class GotoButton extends CarouselControl<GotoButtonProps> {
  render() {
    const controller = this.context;

    return (
      <button
        className={`navigation-button navigation-goto ${this.props.className}`}
        onClick={() => controller.gotoOffset(this.props.gotoOffset)}
      >
        {this.props.children}
      </button>
    );
  }
}
