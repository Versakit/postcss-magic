<div align="center">
  <a href="/">
	<img src="./logo.svg"  />
  </a>
  <h1>PostCSS-Magic</h1>
  <p>
    <a href="">文档</a> | 
    <a href="./README.md">ENGLISH README</a>
  </p>
  <p>
    <img src="https://img.shields.io/npm/l/@varlet/ui.svg" alt="license">
  </p>
</div>

postcss-magic 是一款强大的基于 PostCSS 后处理器，它为你的 CSS 代码带来了动态和条件化的能力。通过引入@if、@for、@else、@each 等在编程语言中常见但 CSS 原生不具备的特性，它让你能够编写更模块化、可维护且高效的样式表。

## ✨ 主要特性

- 条件逻辑：使用@if 和@else 指令，根据自定义表达式有条件地应用样式。这使你能够针对不同的场景（如不同的屏幕尺寸或用户偏好）创建不同的样式规则。
- 循环结构：借助@for 和@each 指令，你可以以更简洁、有条理的方式生成重复的 CSS 代码。在处理一组相似元素或创建响应式网格时，这尤其有用。
  增强的 CSS：通过为 CSS 添加类似编程的特性，postcss-magic 使开发人员能够编写更复杂、动态的样式表，减少代码重复并提高代码可读性。

## 🍿 起步

安装
通过 npm 安装 postcss-magic：

```bash
npm install postcss-magic --save-dev

yarn add postcss-magic --save-dev

pnpm add postcss-magic --save-dev

```

将其包含在你的 PostCSS 配置文件（通常是 postcss.config.js）中：

```javascript
module.exports = {
  plugins: {
    "postcss-magic": {},
  },
};
```

在 vite 中配置(vite.conifg.ts)

```typescript
 css: {
    postcss: {
      plugins: [CssMagic()],
    },
  },

```

## ☕ 使用方法

以下是在 CSS 中使用@if 和@else 的简单示例：

```css
@if (max-width: 768px) {
    body {
        background - color: lightblue;
    }
} @else {
    body {
        background - color: lightgreen;
    }
}
```

以及使用@for 生成一系列类的示例：

```css
@for $i from 1 to 5 {
  .box - $(i) {
    width: 10px _ $i;
    height: 10px _ $i;
  }
}
```

## 贡献

我们欢迎社区的贡献！如果你有任何想法、错误修复或改进建议，请随时提出问题或提交拉取请求。

## 许可证

本项目采用 MIT 许可证。有关详细信息，请参阅 LICENSE 文件。
