import React, { FunctionComponent } from "react";
import { CarouselControl, CarouselControlProps } from "../carousel-control";
import { GotoButton } from "../goto-button/goto-button.component";

export type NavigationButtonCollectionProps = CarouselControlProps & {
  view?: FunctionComponent;
};

export class NavigationButtonCollectionComponent extends CarouselControl<
  NavigationButtonCollectionProps
> {
  render() {
    const controller = this.context;
    const dots = [];

    for (let i = 0; i < controller.length; i++) {
      dots.push(
        <GotoButton
          key={i}
          gotoOffset={i - controller.currentIndex}
          className={`navigation-button ${
            controller.currentIndex === i ? "active" : ""
          }`}
        >
          {this.props.view ? this.props.view({}) : undefined}
        </GotoButton>
      );
    }

    return <div className="navigation-button-collection">{dots}</div>;
  }
}
