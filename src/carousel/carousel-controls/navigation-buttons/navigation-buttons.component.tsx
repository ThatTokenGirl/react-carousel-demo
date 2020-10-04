import React, { FunctionComponent, useContext } from "react";
import { CarouselContext } from "../../carousel.context";
import { CarouselControl } from "../carousel-control";

export class CarouselNavigationButtons extends CarouselControl {
  render() {
    const { context: controller } = this;
    const buttons: any[] = [];
    const { children } = this.props;

    if (controller.hasPrevious) {
      const backButton = React.Children.toArray(children).find(
        (element) =>
          typeof element === "object" &&
          "type" in element &&
          element.type === BackButton
      );

      buttons.push(backButton);
    }

    if (controller.hasNext) {
      const nextButton = React.Children.toArray(children).find(
        (element) =>
          typeof element === "object" &&
          "type" in element &&
          element.type === NextButton
      );
      buttons.push(nextButton);
    }

    return <>{buttons}</>;
  }
}

export const BackButton: FunctionComponent = ({ children }) => {
  const controller = useContext(CarouselContext);

  return (
    <button
      className="carousel-navigation-previous"
      onClick={() => controller.previous()}
    >
      {!children ? "<- Previous" : children}
    </button>
  );
};

export const NextButton: FunctionComponent = ({ children }) => {
  const controller = useContext(CarouselContext);

  return (
    <button
      className="carousel-navigation-next"
      onClick={() => controller.next()}
    >
      {!children ? "Next ->" : children}
    </button>
  );
};
