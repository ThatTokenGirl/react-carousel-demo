import React from "react";
import { CarouselControl } from "../carousel-control";
import { GotoButton } from "../goto-button/goto-button.component";

export class NextButton extends CarouselControl {
  render() {
    const controller = this.context;
    const showNext = !!controller.itemAtOffset(1);

    if (showNext)
      return (
        <GotoButton className="navigation-next-button" gotoOffset={1}>
          {this.props.children}
        </GotoButton>
      );

    return (
      <div
        className="navigation-button navigation-next-button navigation-button-placeholder"
        style={{ display: "inline-block" }}
      >
        &nbsp;
      </div>
    );
  }
}
