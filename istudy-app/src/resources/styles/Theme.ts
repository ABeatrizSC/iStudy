import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#835AFD",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#FF59F8",
    },
    error: {
      main: "#E73F5D",
    },
    background: {
      default: "#F8F8F8",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#29292E",
      secondary: "#7E7E86",
    },
  },
  typography: {
    fontFamily: ["Roboto", "sans-serif"].join(","),
    fontSize: 16,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          textTransform: "none",
          fontWeight: "500",
        },
      },
    },
  },
});

export default theme;