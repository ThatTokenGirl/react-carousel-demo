import { FunctionComponent } from "react";
import { CarouselControllerContext } from "../carousel.context";
import { CarouselRendererProps } from "../renderers";

export type CarouselControlProps = {
  children:
    | React.ReactElement<FunctionComponent<CarouselControlProps>>
    | React.ReactElement<FunctionComponent<CarouselRendererProps>>;
  controller: CarouselControllerContext;
};
