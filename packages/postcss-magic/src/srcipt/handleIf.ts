import type { AtRule } from "postcss";

export function handleIf(atRule: AtRule) {
  const condition = atRule.params.trim();
  let elseRule: AtRule | null = null;

  // 查找后续的@else规则
  let nextNode = atRule.next();
  if (nextNode && nextNode.type === "atrule" && nextNode.name === "else") {
    elseRule = nextNode;
  }

  // 执行条件判断
  const result = new Function("return " + condition)();

  // 插入对应内容
  if (result) {
    atRule.parent?.insertAfter(atRule, atRule.nodes);
  } else if (elseRule) {
    atRule.parent?.insertAfter(atRule, elseRule.nodes);
  }

  // 移除原始规则
  atRule.remove();
  elseRule?.remove();
}
