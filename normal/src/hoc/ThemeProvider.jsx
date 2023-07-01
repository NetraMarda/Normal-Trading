import { ThemeProvider, createTheme } from "@mui/material";
import {
  FC,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { tokens } from "../utils/theme";

const UserThemeContext = createContext({
  toggleTheme: () => {},
});
export const useToggleTheme = () => useContext(UserThemeContext);

const UserTheme = (props) => {
  const { children } = props;

  const { palette } = createTheme();

  const colors = tokens();

  const { augmentColor } = palette;
  const createColor = (mainColor) =>
    augmentColor({ color: { main: mainColor } });
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: "light",
          violet: createColor(colors.violet[500]),
          indigo: createColor(colors.indigo[500]),
          blue: createColor(colors.blue[500]),
          green: createColor(colors.green[500]),
          red: createColor(colors.red[500]),
          bgColor: createColor(colors.bgColor),
          card: createColor(colors.card),
          sidebar: createColor(colors.sidebar),
          textColor: createColor(colors.textColor[500]),
          background: {
            default: colors.bgColor,
          },
        },
        typography: {},
      }),
    // createTheme(themeSettings(userTheme)),
    []
  );

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default UserTheme;
