import {
  IComponents,
  IConfig,
  componentsConfig,
  gluestackUIConfig,
} from "@gluestack-ui/config";

declare module "@gluestack-ui/themed" {
  interface UIConfig
    extends Omit<typeof gluestackUIConfig, keyof IConfig>,
      IConfig {}
  interface UIComponents
    extends Omit<typeof componentsConfig, keyof IComponents>,
      IComponents {}
}
