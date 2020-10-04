import { FunctionComponent } from "react";
import { CarouselRendererProps } from "../renderers";

export type CarouselControlProps = {
  children:
    | React.ReactElement<FunctionComponent<CarouselControlProps>>
    | React.ReactElement<FunctionComponent<CarouselRendererProps>>;
};
