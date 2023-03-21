import { DeckProps } from "spectacle";

export const easings = {
  cubic: "cubic-bezier(0.35, 1.5, 0.65, 1)",
}

export const colors = {
  white: "#ffffff",
  black: "000000", // tokens.Primary.Black.value,
  cyan: "#05d3fb",
  iris: {
    500: "#5361f8",
    600: "#343A80",
    800: "#1E224E",
    900: "#161839"
  },
  magenta: "#d362df",
  yellow: "#f8ba26",
  green: "#89eb5b",
}

export const fontFamilies =  {
  extended: ['"Colton Display"', 'sans-serif'].join(','),
  sans: ['"Colton Primary"', 'sans-serif'].join(','),
  monospace: ['"IBM Plex Mono"', 'monospace'].join(','),
}

export const fontSizes = {
  1: 8,
  2: 10,
  3: 12,
  4: 14,
  5: 16,
  6: 18,
  7: 20,
  8: 22,
  9: 24,
  10: 28,
  11: 32,
  12: 40,
  13: 48,
  14: 64,
}

export const leading = {
  tight: "105%",
  normal: "125%",
  loose: "150%",
  "very-loose": "175%",
}

export const letterSpacing = {
  PrimaryHeading: "1%",
  PrimaryText: "0.5%",
  UppercaseDisplay: "calc(var(--vmin, 1vmin) * 1)",
}

export const displayHeadingProps = {
  fontFamily: fontFamilies.extended,
  fontStretch: "expanded",
  letterSpacing: letterSpacing.UppercaseDisplay,
  lineHeight: leading.tight,
}

export const typography = {
  fontFamilies:{...fontFamilies},
  fontSizes: {...fontSizes},
  leading: {...leading},
  letterSpacing: {...letterSpacing},
  display: {
    h1: {
      fontSize: `clamp(calc(var(--vmin, 1vmin) * 5), ${fontSizes[14]}px, calc(var(--vmin, 1vmin) * 8))`,
      ...displayHeadingProps,
    },
    h2: {
      fontSize: `clamp(calc(var(--vmin, 1vmin) * 4.5), ${fontSizes[13]}px, calc(var(--vmin, 1vmin) * 7))`,
      ...displayHeadingProps,
    },
    h3: {
      fontSize: `clamp(calc(var(--vmin, 1vmin) * 4), ${fontSizes[12]}px, calc(var(--vmin, 1vmin) * 6))`,
      ...displayHeadingProps,
    },
    h4: {
      fontSize: `clamp(calc(var(--vmin, 1vmin) * 4), ${fontSizes[11]}px, calc(var(--vmin, 1vmin) * 5))`,
      ...displayHeadingProps,
    },
    h5: {
      fontSize: `clamp(calc(var(--vmin, 1vmin) * 3), ${fontSizes[10]}px, calc(var(--vmin, 1vmin) * 4))`,
      ...displayHeadingProps,
    },
    h6: {
      fontSize: `clamp(calc(var(--vmin, 1vmin) * 2), ${fontSizes[9]}px, calc(var(--vmin, 1vmin) * 3))`,
      ...displayHeadingProps,
    },
  }
}

export const theme: DeckProps["theme"] = {
  colors: {
    primary: 'rgba(255, 255, 255, 0.8)',
    secondary: colors.white,
    tertiary: colors.black,
    quaternary: colors.yellow,
    quinary: colors.cyan,
  },
  fontSizes: {
    h1: typography.display.h1.fontSize,
    h2: typography.display.h3.fontSize,
    h3: typography.display.h5.fontSize,
    text: `${typography.fontSizes["10"]}px`,
    monospace: `${typography.fontSizes["10"]}px`,
  },
  fonts: {
    header: fontFamilies.extended,
    text: fontFamilies.sans,
    monospace: fontFamilies.monospace,
  },
};