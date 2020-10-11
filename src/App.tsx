import {
  Button,
  ButtonGroup,
  Checkbox,
  CssBaseline,
  Divider,
  Drawer,
  FormControlLabel,
  FormLabel,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Radio,
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
import {
  DefaultCarouselControllerContext,
  InfiniteCarouselControllerContext,
} from "./carousel/carousel.context";
import theme from "./theme";

type AppState = {
  renderer: "2d" | "3d";
  autoplay: boolean;
  displayableFor3d: number;
  infiniteScroll: boolean;
};

const drawerWidth = 268;
const useStyles = makeStyles((theme) => {
  return {
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    toolbar: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      display: "grid",
      placeItems: "center",
    },
  };
});

function App() {
  const classes = useStyles();

  const [state, setState] = useState<AppState>({
    renderer: "2d",
    autoplay: false,
    displayableFor3d: 5,
    infiniteScroll: false,
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
      <CssBaseline></CssBaseline>
      <aside className={classes.drawer}>
        <Drawer
          className={classes.drawer}
          classes={{
            paper: classes.drawerPaper,
          }}
          variant="permanent"
          anchor="left"
        >
          <div className={classes.toolbar}></div>
          <Divider></Divider>
          <List>
            <ListItem button onClick={() => merge({ renderer: "2d" })}>
              <Radio checked={state.renderer === "2d"}></Radio>
              <ListItemText>2D</ListItemText>
            </ListItem>
            <Divider></Divider>
            <ListItem button onClick={() => merge({ renderer: "3d" })}>
              <Radio checked={state.renderer === "3d"} />
              <ListItemText>3D</ListItemText>
            </ListItem>
            <ListItem>
              <FormLabel># Displayable Slides</FormLabel>
            </ListItem>
            <ListItem>
              <ButtonGroup disabled={state.renderer !== "3d"}>
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
            </ListItem>
            <Divider></Divider>
            <ListItem
              button
              onClick={() => merge({ autoplay: !state.autoplay })}
            >
              <Checkbox checked={state.autoplay} />
              <ListItemText>Autoplay</ListItemText>
            </ListItem>
            <Divider></Divider>
            <ListItem
              button
              onClick={() => merge({ infiniteScroll: !state.infiniteScroll })}
            >
              <Checkbox checked={state.infiniteScroll}></Checkbox>
              <ListItemText>Loop</ListItemText>
            </ListItem>
            <Divider></Divider>
          </List>
        </Drawer>
      </aside>

      <section className={classes.content}>
        <Carousel
          controller={
            state.infiniteScroll
              ? InfiniteCarouselControllerContext
              : DefaultCarouselControllerContext
          }
        >
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
      </section>
    </ThemeProvider>
  );
}

export default App;
