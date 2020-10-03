import React from "react";
import "./App.css";
import {
  Carousel,
  CarouselItem,
  CarouselNavigationButtons,
  CarouselRenderer2d,
} from "./carousel";
import { InfiniteCarouselControllerContext } from "./carousel/carousel.context";

function App() {
  return (
    <Carousel
      display={CarouselRenderer2d}
      controller={InfiniteCarouselControllerContext}
      controls={[CarouselNavigationButtons]}
    >
      <CarouselItem>
        <div className="item" style={{ backgroundColor: "#2c3e50" }}>
          One
        </div>
      </CarouselItem>
      <CarouselItem>
        <div className="item" style={{ backgroundColor: "#8e44ad" }}>
          Two
        </div>
      </CarouselItem>
      <CarouselItem>
        <div className="item" style={{ backgroundColor: "#16a085" }}>
          Three
        </div>
      </CarouselItem>
    </Carousel>
  );
}

export default App;
