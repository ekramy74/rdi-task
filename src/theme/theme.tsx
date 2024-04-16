import { createTheme } from "@mui/material/styles";

const ThemeSettings = () => {
  const theme = createTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 960,
        lg: 1280,
        xl: 1920,
      },
    },
  });

  return theme;
};

export { ThemeSettings };
