import { defineConfig } from "vitepress";
import { getGuideSidebar } from "./config/getGuideSidebar";
import { getNav } from "./config/getnav.ts";
import { groupIconMdPlugin, groupIconVitePlugin } from "vitepress-plugin-group-icons";

export default defineConfig({
  title: "PostCss-Magic",
  description: "A VitePress Site",
  themeConfig: {
    nav: getNav(),
    sidebar: {
      "/guide/": getGuideSidebar(),
      "/docs/": [],
    } as any,
    socialLinks: [{ icon: "github", link: "https://github.com/Versakit/postcss-magic" }],
  },

  markdown: {
    config(md) {
      md.use(groupIconMdPlugin);
    },
  },
  vite: {
    plugins: [groupIconVitePlugin()],
  },
});
