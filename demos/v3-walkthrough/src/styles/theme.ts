interface ColorTheme {
  "900": string,
  "800": string,
  "700": string,
  "600": string,
  "500": string,
  "400": string,
  "300": string,
  "200": string,
  "100": string,
  "50": string
}

// From: https://tailwindcss.com/docs/customizing-colors

const slate: ColorTheme = {
  "900": "#0f172a",
  "800": "#1e293b",
  "700": "#334155",
  "600": "#475569",
  "500": "#64748b",
  "400": "#94a3b8",
  "300": "#cbd5e1",
  "200": "#e2e8f0",
  "100": "#f1f5f9",
  "50": "#f8fafc"
}

const gray: ColorTheme = {
  "900": "#111827",
  "800": "#1f2937",
  "700": "#374151",
  "600": "#4b5563",
  "500": "#6b7280",
  "400": "#9ca3af",
  "300": "#d1d5db",
  "200": "#e5e7eb",
  "100": "#f3f4f6",
  "50": "#f9fafb"
}

const zinc: ColorTheme = {
  "900": "#18181b",
  "800": "#27272a",
  "700": "#3f3f46",
  "600": "#52525b",
  "500": "#71717a",
  "400": "#a1a1aa",
  "300": "#d4d4d8",
  "200": "#e4e4e7",
  "100": "#f4f4f5",
  "50": "#fafafa"
}

const neutral: ColorTheme = {
  "900": "#171717",
  "800": "#262626",
  "700": "#404040",
  "600": "#525252",
  "500": "#737373",
  "400": "#a3a3a3",
  "300": "#d4d4d4",
  "200": "#e5e5e5",
  "100": "#f5f5f5",
  "50": "#fafafa"
}

const stone: ColorTheme = {
  "900": "#1c1917",
  "800": "#292524",
  "700": "#44403c",
  "600": "#57534e",
  "500": "#78716c",
  "400": "#a8a29e",
  "300": "#d6d3d1",
  "200": "#e7e5e4",
  "100": "#f5f5f4",
  "50": "#fafaf9"
}

const red: ColorTheme = {
  "900": "#7f1d1d",
  "800": "#991b1b",
  "700": "#b91c1c",
  "600": "#dc2626",
  "500": "#ef4444",
  "400": "#f87171",
  "300": "#fca5a5",
  "200": "#fecaca",
  "100": "#fee2e2",
  "50": "#fef2f2"
}

export const colorThemes = {
  "slate": slate,
  "gray": gray,
  "zinc": zinc,
  "neutral": neutral,
  "stone": stone,
  "red": red
};

export type ColorThemes = keyof (typeof colorThemes);

export interface Theme {
  colors: ColorTheme;
}

export const defaultTheme: Theme = {
  colors: colorThemes.neutral
};
