import React from "react";
import { CarouselControl, CarouselControlProps } from "../carousel-control";

export type AutoScrollProps = CarouselControlProps & { duration: number };

export class AutoScroll extends CarouselControl<AutoScrollProps> {
  private _timeout: NodeJS.Timeout | null = null;

  componentWillUnmount() {
    if (this._timeout) clearTimeout(this._timeout);
  }

  render(): React.ReactNode {
    if (this._timeout) clearTimeout(this._timeout);

    const controller = this.context;
    const { duration } = this.props;

    this._timeout = setTimeout(() => controller.gotoOffset(1), duration);

    return null;
  }
}
