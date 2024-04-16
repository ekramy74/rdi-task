import { FC } from "react";
import { useRoutes } from "react-router-dom";
import Router from "./routes/Router";
import ScrollToTop from "./components/scrollToTop/ScrollToTop";
import { CssBaseline } from "@mui/material";

const App: FC = () => {
  const routing = useRoutes(Router);

  return (
    <>
      <CssBaseline />
      <ScrollToTop>{routing}</ScrollToTop>
    </>
  );
};

export default App;
