import { DefaultTheme } from "vitepress";

export const getNav = (): DefaultTheme.NavItem[] => {
  return [{ text: "指南", link: "/guide/installation/" }];
};
