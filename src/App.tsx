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
    <Carousel controller={InfiniteCarouselControllerContext}>
      <CarouselRenderer2d></CarouselRenderer2d>
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
      <CarouselNavigationButtons></CarouselNavigationButtons>
    </Carousel>
  );
}

export default App;
