import tokens from "./tokens.json"

export const easings = {
  cubic: "cubic-bezier(0.35, 1.5, 0.65, 1)",
}

export const animations = {
  float: {
    "@keyframes float": {
      "0%, 100%": {
        transform: "translateY(-3%)",
      },
      "50%": {
        transform: "translateY(0%)",
      },
    },
  },
  fadeUp: {
    "@keyframes fadeUp": {
      "0%": {
        opacity: 0,
        transform: "translateY(10%)",
      },
      "100%": {
        opacity: 1,
        transform: "translateY(0%)",
      },
    },
  }
}

export const colors = {
  white: tokens.White[1000].value,
  black: "000000", // tokens.Primary.Black.value,
  cyan: tokens.Primary.Cyan.value,
  iris: {
    500: tokens.Primary.Iris.value,
    600: "#343A80",
    800: "#1E224E",
    900: tokens.Grays[900].value
  },
  magenta: tokens.Primary.Magenta.value,
  yellow: tokens.Primary.Yellow.value,
  green: tokens.Primary.Green.value,
}

export const gradients = {
  "Iris-Black": "linear-gradient(180deg, #06071a 39.58%, #1e2567 100%)",
  "Linear": "linear-gradient(135deg, #05d3fb 0%, #5361f8 14.58%, #d362df 41.15%, #f8ba26 67.19%, #49f128 85.42%, #05d3fb 100%)",
  "Button": "linear-gradient(180deg, #161839 0%, #06071a 100%)",
}

export const gradientBorderStyles = {
  border: `solid 2px transparent`,
  backgroundImage: `linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 0)), ${gradients.Linear}`,
  backgroundOrigin: "border-box",
  backgroundClip: "content-box, border-box",
  boxShadow: `2px 1000px 1px ${colors.black} inset`,
  "&:hover": {
    boxShadow: `2px 1000px 1px ${colors.iris[900]} inset`
  }
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
  tight: tokens.Tight.value,
  normal: tokens.Normal.value,
  loose: tokens.Loose.value,
  "very-loose": tokens["Very Loose"].value,
}

export const letterSpacing = {
  PrimaryHeading: tokens["Primary Heading"].value,
  PrimaryText: tokens["Primary Text"].value,
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

export const theme = {
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