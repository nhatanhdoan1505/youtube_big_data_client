import { extendTheme, ThemeConfig } from "@chakra-ui/react";

// 2. Add your color mode config

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: true,
};

// 3. extend the theme
export const theme = extendTheme({ config });
