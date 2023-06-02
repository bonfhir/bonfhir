import { MantineThemeOverride } from "@mantine/core";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({});

const theme: MantineThemeOverride = {
  colorScheme: "light",
  fontFamily: montserrat.style.fontFamily,
  components: {
    Grid: {
      defaultProps: {
        columns: 12,
      },
    },
    Paper: {
      defaultProps: {
        p: "sm",
      },
    },
    Table: {
      defaultProps: {
        striped: true,
        highlightOnHover: true,
      },
    },
  },
};

export default theme;
