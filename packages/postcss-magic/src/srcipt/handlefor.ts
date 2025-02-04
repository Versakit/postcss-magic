import type { AtRule, Node } from "postcss";

/**
 * 支持两种循环方式：  through 包含结束值 (1-3循环3次)  to 不包含结束值 (1-3循环2次)
 * 自动处理选择器和属性值中的变量替换
 * 支持数字递增逻辑，可轻松扩展支持步长参数
 * 错误处理机制保证语法合法性
 * @param atRule
 */
export function handleFor(atRule: AtRule) {
  const params = atRule.params.trim();

  // 使用正则解析参数格式：$var from <start> through <end>
  const match = params.match(/^\s*(\$\w+)\s+from\s+(\d+)\s+(through|to)\s+(\d+)\s*$/i);
  if (!match) {
    throw new Error(`Invalid @for syntax: ${atRule.params}`);
  }

  const [, variable, startStr, direction, endStr] = match;
  const variableName = variable.replace(/^\$/, "");
  const start = parseInt(startStr);
  const end = parseInt(endStr);

  // 生成数字序列
  const numbers: number[] = [];
  const step = 1; // 可以扩展支持步长
  if (direction.toLowerCase() === "through") {
    for (let i = start; i <= end; i += step) numbers.push(i);
  } else {
    // to
    for (let i = start; i < end; i += step) numbers.push(i);
  }

  const nodes: Node[] = [];

  for (const num of numbers) {
    const clone = atRule.clone();

    clone.walk((node) => {
      if (node.type === "rule") {
        node.selector = node.selector.replace(new RegExp(`\\$\\(${variableName}\\)`, "g"), num.toString());
      } else if (node.type === "decl") {
        node.value = node.value.replace(new RegExp(`\\$\\(${variableName}\\)`, "g"), num.toString());
      }
    });

    nodes.push(...clone.nodes);
  }

  atRule.parent?.insertAfter(atRule, nodes);
  atRule.remove();
}
