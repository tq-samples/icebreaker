import React from "react";
import "./App.css";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CenteredTabsPage from "./components/CenterdTabsPage";
import Typography from "@mui/material/Typography";

const theme = createTheme({
  typography: {
    fontFamily: `"Hiragino Kaku Gothic ProN", "ヒラギノ角ゴ ProN", "Hiragino Sans", "ヒラギノ角ゴシック", "Meiryo", "メイリオ", sans-serif`,
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            誰かに何かを話してもらうアプリ
          </Typography>
        </Toolbar>
      </AppBar>
      <CenteredTabsPage />
    </ThemeProvider>
  );
}

export default App;
