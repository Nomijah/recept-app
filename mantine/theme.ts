"use client";
import { createTheme, Input, NumberInput, rem, TextInput } from "@mantine/core";
import { dark, custom } from "./colors";

export const theme = createTheme({
  primaryColor: "custom",
  autoContrast: true,
  fontFamily: "Platypi",
  colors: {
    custom: custom,
    dark: dark,
  },
  fontSizes: {
    sm: rem(14),
    md: rem(16),
    lg: rem(24),
  },
  components: {
    Input: Input.extend({
      styles: (theme) => {
        return {
          input: {
            borderRadius: "8px",
            outline: "black",
            background: "hsl(var(--card))",
            '&:focus' :{outline: 'blue', ring: 'black'},
          },
          section: {
            borderRadius: "8px",
            '&:hover': {
                borderRadius: "8px"
            }
          },
          wrapper: {
            borderRadius: "8px"
          }
        };
      },
    }),
  },
});