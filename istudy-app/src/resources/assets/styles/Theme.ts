import { createTheme, PaletteColor, PaletteColorOptions } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    red: PaletteColor;
    green: PaletteColor;
    hover: {
      primary: string;
      secondary: string;
      red: string;
      green: string;
    };
  }
  interface PaletteOptions {
    red?: PaletteColorOptions;
    green?: PaletteColorOptions;
    hover?: {
      primary: string;
      secondary: string;
      red: string;
      green: string;
    };
  }
}

const theme = createTheme({
  palette: {
    primary: {
      main: "#835AFD",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#FF59F8",
    },
    red: {
      main: "#E73F5D",
    },
    green: {
      main: "#00C853",
    },
    background: {
      default: "#F8F8F8",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#29292E",
      secondary: "#a1aaaf",
    },
    hover: {
      primary: "#6A46D4",
      secondary: "#E64ED6",
      red: "#C5304E",
      green: "#009C3B",
    },
  },
});

export default theme;