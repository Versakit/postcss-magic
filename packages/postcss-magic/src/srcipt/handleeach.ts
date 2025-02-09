import type { AtRule, Node } from "postcss";

export function handleEach(atRule: AtRule) {
  const params = atRule.params.trim();

  // 解析变量声明
  const varMatch = params.match(/^\s*((?:\$\w+,\s*)*\$\w+)\s+in\s+(.+)$/i);
  if (!varMatch) {
    throw new Error(`Invalid @each syntax: ${atRule.params}`);
  }

  const variables = varMatch[1].split(/,\s*/).map((v) => v.replace(/^\$/, "").trim());
  const listsStr = varMatch[2];

  // 增强的列表解析器
  const lists: string[][] = [];
  let currentList: string[] = [];
  let currentItem = "";
  let depth = 0;
  let inQuote = false;

  // 处理显式括号包裹的列表
  if (variables.length > 1) {
    const listRegex = /\(([^)]+)\)/g;
    let match;

    while ((match = listRegex.exec(listsStr)) !== null) {
      lists.push(match[1].split(/,\s*/).map((s) => s.trim()));
    }
  } else {
    // 单变量列表处理（保持原有逻辑）
    lists.push(listsStr.split(/,\s*/).map((s) => s.trim()));
  }

  // 验证列表数量
  if (lists.length !== variables.length) {
    throw new Error(`Variables count (${variables.length}) doesn't match lists count (${lists.length})`);
  }

  // 计算最小迭代次数
  const minLength = Math.min(...lists.map((l) => l.length));
  const nodes: Node[] = [];

  // 生成规则节点
  for (let i = 0; i < minLength; i++) {
    const clone = atRule.clone() as AtRule;
    const replacements: Record<string, string> = {};

    variables.forEach((varName, listIndex) => {
      replacements[varName] = lists[listIndex][i];
    });

    clone.walk((node) => {
      if (node.type === "rule") {
        node.selector = replacePlaceholders(node.selector, replacements);
      }
      if (node.type === "decl") {
        node.value = replacePlaceholders(node.value, replacements);
      }
    });

    nodes.push(...clone.nodes);
  }

  // 替换原始规则
  if (atRule.parent) {
    atRule.parent.insertAfter(atRule, nodes);
    atRule.remove();
  }
}

function replacePlaceholders(str: string, vars: Record<string, string>): string {
  return str.replace(/\$\((\w+)\)/g, (_, name) => vars[name] ?? "");
}
