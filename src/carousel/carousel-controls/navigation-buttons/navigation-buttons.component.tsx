import React, { FunctionComponent, useContext } from "react";
import { CarouselContext } from "../../carousel.context";
import { CarouselControl } from "../carousel-control";

export class CarouselNavigationButtons extends CarouselControl {
  render() {
    const { context: controller } = this;
    const buttons: any[] = [];
    const { children } = this.props;

    if (!!controller.itemAtOffset(-1)) {
      const backButton = React.Children.toArray(children).find(
        (element) =>
          typeof element === "object" &&
          "type" in element &&
          element.type === BackButton
      );

      buttons.push(backButton);
    }

    if (!!controller.itemAtOffset(1)) {
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
      onClick={() => controller.gotoOffset(-1)}
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
      onClick={() => controller.gotoOffset(1)}
    >
      {!children ? "Next ->" : children}
    </button>
  );
};
