import React from "react";
import { ThemeProvider as StyledThemeProvider } from "styled-components";

import { Theme, defaultTheme } from "../styles/theme";

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeContext = React.createContext<{
  theme: Theme;
  setTheme: (theme: Theme) => void;
}>({
  theme: defaultTheme,
  setTheme: () => {}
});

function ThemeProvider(props: ThemeProviderProps) {
  const [theme, setTheme] = React.useState(defaultTheme);

  return (
    <StyledThemeProvider theme={theme}>
      <ThemeContext.Provider value={{ theme, setTheme }}>
          {props.children}
      </ThemeContext.Provider>
    </StyledThemeProvider>
  )
}

export default ThemeProvider;
