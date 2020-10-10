import {
  Button,
  ButtonGroup,
  Checkbox,
  FormControlLabel,
  ThemeProvider,
} from "@material-ui/core";
import React, { useState } from "react";
import "./App.css";
import {
  AutoScroll,
  BackButton,
  Carousel,
  CarouselItem,
  CarouselRenderer2d,
  CarouselRenderer3d,
  NextButton,
} from "./carousel";
import { NavigationButtonCollectionComponent } from "./carousel/carousel-controls/navigation-button-collection/navigation-button-collection.component";
import { InfiniteCarouselControllerContext } from "./carousel/carousel.context";
import theme from "./theme";

type AppState = {
  renderer: "2d" | "3d";
  autoplay: boolean;
  displayableFor3d: number;
};

function App() {
  const [state, setState] = useState<AppState>({
    renderer: "3d",
    autoplay: false,
    displayableFor3d: 5,
  });

  const merge = (partial: Partial<AppState>) => {
    setState({ ...state, ...partial });
  };

  const renderer =
    state.renderer === "2d" ? (
      <CarouselRenderer2d></CarouselRenderer2d>
    ) : (
      <CarouselRenderer3d
        displayable={state.displayableFor3d}
      ></CarouselRenderer3d>
    );

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
        label="Autoplay"
      />
      {state.renderer === "3d" && (
        <FormControlLabel
          className="slide-selector"
          control={
            <ButtonGroup>
              {Array.from(Array(6)).map((_, index) => (
                <Button
                  key={index}
                  color="primary"
                  variant={
                    state.displayableFor3d === index + 3
                      ? "contained"
                      : "outlined"
                  }
                  onClick={() => merge({ displayableFor3d: index + 3 })}
                >
                  {index + 3}
                </Button>
              ))}
            </ButtonGroup>
          }
          label="# Displayable Slides"
          labelPlacement="top"
        />
      )}

      <Carousel controller={InfiniteCarouselControllerContext}>
        {renderer}
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
        <CarouselItem>
          <div className="item" style={{ backgroundColor: "#fbc531" }}>
            Four
          </div>
        </CarouselItem>
        <CarouselItem>
          <div className="item" style={{ backgroundColor: "#353b48" }}>
            Five
          </div>
        </CarouselItem>
        <CarouselItem>
          <div className="item" style={{ backgroundColor: "#487eb0" }}>
            Six
          </div>
        </CarouselItem>
        <CarouselItem>
          <div className="item" style={{ backgroundColor: "#e84118" }}>
            Seven
          </div>
        </CarouselItem>
        <CarouselItem>
          <div className="item" style={{ backgroundColor: "#8c7ae6" }}>
            Eight
          </div>
        </CarouselItem>
        <CarouselItem>
          <div className="item" style={{ backgroundColor: "#833471" }}>
            Nine
          </div>
        </CarouselItem>
        <CarouselItem>
          <div className="item" style={{ backgroundColor: "#009432" }}>
            Ten
          </div>
        </CarouselItem>
        {state.autoplay && (
          <AutoScroll key="autoplay" duration={3000}></AutoScroll>
        )}
        <BackButton key="back">&lsaquo;</BackButton>
        <NavigationButtonCollectionComponent key="button-collection"></NavigationButtonCollectionComponent>
        <NextButton key="next">&rsaquo;</NextButton>
      </Carousel>
    </ThemeProvider>
  );
}

export default App;
