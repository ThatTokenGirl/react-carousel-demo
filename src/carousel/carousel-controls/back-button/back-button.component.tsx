import React from "react";
import { CarouselControl } from "../carousel-control";
import { GotoButton } from "../goto-button/goto-button.component";

export class BackButton extends CarouselControl {
  render() {
    const controller = this.context;
    const showBack = !!controller.itemAtOffset(-1);

    if (showBack)
      return (
        <GotoButton className="navigation-back-button" gotoOffset={-1}>
          {this.props.children}
        </GotoButton>
      );

    return (
      <div
        className="navigation-button navigation-back-button navigation-button-placeholder"
        style={{ display: "inline-block" }}
      >
        &nbsp;
      </div>
    );
  }
}
