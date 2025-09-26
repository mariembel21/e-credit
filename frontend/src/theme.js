// theme.js
import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    brand: {
      900: "#21273D", // sombre
      700: "#6A759B", // secondaire
      500: "#B9D4F1", // clair
      100: "#F1F6F8", // fond
    },
  },
  fonts: {
    heading: `'Adamina', serif`,
    body: `'Adamina', serif`,
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: "medium",
      },
      sizes: {
        md: {
          px: 6,
          py: 4,
          fontSize: "md",
        },
      },
      variants: {
        solid: {
          bg: "brand.900",
          color: "white",
          _hover: {
            bg: "brand.700",
          },
        },
      },
      defaultProps: {
        size: "md",
        variant: "solid",
      },
    },
  },
  styles: {
    global: {
      body: {
        bg: "brand.100",
        color: "brand.900",
      },
    },
  },
  FormLabel: {
      baseStyle: {
        fontWeight: "bold",
        fontSize: "sm", // ou md si tu préfères
      },
    },
    Heading: {
      baseStyle: {
        fontWeight: "bold",
        fontSize: "lg",
      },
    },
    Text: {
      baseStyle: {
        fontWeight: "normal",
        fontSize: "sm",
      },
    },
  
 
});

export default theme;
