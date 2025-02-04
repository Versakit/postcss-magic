import type { AtRule, Node } from "postcss";

export function handleEach(atRule: AtRule) {
  const params = atRule.params.trim();

  // 正确解析变量和列表部分
  const match = params.match(/^\s*(\$\w+)\s+in\s+(.+)$/i);
  if (!match) {
    throw new Error(`Invalid @each syntax: ${atRule.params}`);
  }
  const variable = match[1];
  const list = match[2].trim();

  // 提取变量名（去掉$符号）
  const variableName = variable.replace(/^\$/, "");

  // 分割列表项（支持逗号和空格分隔）
  const items = list.split(/[\s,]+/).filter((item) => item !== "");

  const nodes: Node[] = [];

  for (const item of items) {
    const clone: any = atRule.clone();

    // 遍历并修改克隆节点的子节点
    clone.walk((node) => {
      if (node.type === "rule") {
        // 替换选择器中的变量引用
        node.selector = node.selector.replace(new RegExp(`\\$\\(${variableName}\\)`, "g"), item);
      } else if (node.type === "decl") {
        // 替换属性值中的变量引用
        node.value = node.value.replace(new RegExp(`\\$\\(${variableName}\\)`, "g"), item);
      }
    });

    nodes.push(...clone.nodes);
  }

  // 插入生成的新节点并移除原始@each规则
  atRule.parent?.insertAfter(atRule, nodes);
  atRule.remove();
}
