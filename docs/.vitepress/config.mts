import { defineConfig } from "vitepress";
import { getGuideSidebar } from "./config/getGuideSidebar";
import { getNav } from "./config/getnav.ts";

export default defineConfig({
  title: "PostCss-Magic",
  description: "A VitePress Site",
  themeConfig: {
    nav: getNav(),
    sidebar: {
      "/guide/": getGuideSidebar(),
    } as any,
    socialLinks: [{ icon: "github", link: "https://github.com/Versakit/postcss-magic" }],
  },
});
