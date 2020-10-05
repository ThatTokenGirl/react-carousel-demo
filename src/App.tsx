import {
  Button,
  ButtonGroup,
  Checkbox,
  FormControlLabel,
  ThemeProvider,
} from "@material-ui/core";
import React, { useState } from "react";
import theme from "./theme";
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

type AppState = {
  renderer: "2d" | "3d";
  autoplay: boolean;
};

function App() {
  const [state, setState] = useState<AppState>({
    renderer: "2d",
    autoplay: false,
  });

  const merge = (partial: Partial<AppState>) => {
    setState({ ...state, ...partial });
  };

  const controls = [];

  if (state.autoplay) controls.push(<AutoScroll duration={3000}></AutoScroll>);

  controls.push(<BackButton>&lsaquo;</BackButton>);
  controls.push(
    <NavigationButtonCollectionComponent></NavigationButtonCollectionComponent>
  );
  controls.push(<NextButton>&rsaquo;</NextButton>);

  return (
    <ThemeProvider theme={theme}>
      <ButtonGroup>
        <Button
          color="primary"
          variant={state.renderer === "2d" ? "contained" : "outlined"}
          onClick={() => merge({ renderer: "2d" })}
        >
          2D
        </Button>
        <Button
          color="primary"
          variant={state.renderer === "3d" ? "contained" : "outlined"}
          onClick={() => merge({ renderer: "3d" })}
        >
          3D
        </Button>
      </ButtonGroup>

      <FormControlLabel
        control={
          <Checkbox
            checked={state.autoplay}
            onChange={() => merge({ autoplay: !state.autoplay })}
          />
        }
        label="Autoply"
      />

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
        {controls}
      </Carousel2d>
    </ThemeProvider>
  );
}

export default App;
