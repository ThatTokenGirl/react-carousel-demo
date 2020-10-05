import React from "react";
import "./App.css";
import {
  AutoScroll,
  BackButton,
  Carousel2d,
  CarouselItem,
  NextButton,
} from "./carousel";
import { NavigationButtonCollectionComponent } from "./carousel/carousel-controls/navigation-button-collection/navigation-button-collection.component";
import { InfiniteCarouselControllerContext } from "./carousel/carousel.context";

function App() {
  return (
    <Carousel2d controller={InfiniteCarouselControllerContext}>
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
      <AutoScroll duration={3000}></AutoScroll>
      <BackButton>&lsaquo;</BackButton>
      <NavigationButtonCollectionComponent></NavigationButtonCollectionComponent>
      <NextButton>&rsaquo;</NextButton>
    </Carousel2d>
  );
}

export default App;
