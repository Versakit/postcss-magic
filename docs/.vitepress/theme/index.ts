import DefaultTheme from "vitepress/theme";
import "./index.css";
import "virtual:group-icons.css";

export default {
  extends: DefaultTheme, // or ...DefaultTheme
  enhanceApp({ app }) {},
};
