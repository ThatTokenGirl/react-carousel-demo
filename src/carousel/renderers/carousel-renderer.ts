import { CarouselItem } from "../carousel-item/carousel-item.component";
import { CarouselController } from "../carousel.context";

export type CarouselRendererProps = {
  controller: CarouselController;
  children: React.ReactElement<typeof CarouselItem>[];
};
