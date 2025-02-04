import { AtRule, Root } from "postcss";
import { handleIf, handleEach, handleFor } from "./srcipt/index";

interface PostcssIfElseOptions {
  // 插件选项（保留备用）
}

const CssMagic = (_options: PostcssIfElseOptions = {}) => {
  return {
    postcssPlugin: "postcss-magic",
    Once(root: Root) {
      root.walkAtRules((atRule: AtRule) => {
        switch (atRule.name) {
          case "if":
            handleIf(atRule);
            break;
          case "for":
            handleFor(atRule);
            break;
          case "each":
            handleEach(atRule);
            break;
        }
      });
    },
  };
};

CssMagic.postcss = true;

export default CssMagic;
