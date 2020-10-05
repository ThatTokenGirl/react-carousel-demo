import React from "react";
import "./App.css";
import {
  BackButton,
  Carousel,
  CarouselItem,
  CarouselRenderer2d,
  NextButton,
} from "./carousel";
import { NavigationButtonCollectionComponent } from "./carousel/carousel-controls/navigation-button-collection/navigation-button-collection.component";
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
      <BackButton>&lsaquo;</BackButton>
      <NavigationButtonCollectionComponent></NavigationButtonCollectionComponent>
      <NextButton>&rsaquo;</NextButton>
    </Carousel>
  );
}

export default App;
