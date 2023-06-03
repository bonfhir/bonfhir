import { ServerStyles, createStylesServer } from "@mantine/next";
import Document, { DocumentContext } from "next/document";
import { styleCache } from "./style-cache";

const stylesServer = createStylesServer(styleCache);

export default class _Document extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);

    // Add your app specific logic here

    return {
      ...initialProps,
      styles: [
        initialProps.styles,
        <ServerStyles
          html={initialProps.html}
          server={stylesServer}
          key="styles"
        />,
      ],
    };
  }
}
