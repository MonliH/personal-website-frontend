import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      lightBg: string;
      darkBg: string;
      darkerBg: string;
      fontColor: string;
    };
    fonts: {
      sansSerif: string;
      sansSerifAlt: string;
      sansSerifBody: string;
      monospace: string;
    };
  }
}
