import { red } from "@material-ui/core/colors";
import { createMuiTheme } from "@material-ui/core/styles";

// A custom theme for this app
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#6200ed",
    },
    secondary: {
      main: "#bb86fc",
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "#f5f6f8",
    },
  },
});

export default theme;
