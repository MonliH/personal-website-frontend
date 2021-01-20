import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      lightBg: string;
      darkBg: string;
      fontColor: string;
    };
    fonts: {
      sansSerif: string;
      sansSerifBody: string;
      monospace: string;
    };
  }
}
