<div align="center">
  <a href="/">
	<img src="./logo.svg"  />
  </a>
  <h1>PostCSS-Magic</h1>
  <p>
    <a href="">Documentation</a> | 
    <a href="./README.md">ENGLISH README</a>
  </p>
  <p>
    <img src="https://img.shields.io/npm/l/@varlet/ui.svg" alt="license">
  </p>
</div>

PostCSS-Magic is a powerful PostCSS-based post-processor that brings dynamic and conditional capabilities to your CSS code. By introducing features like @if, @for, @else, @each, which are common in programming languages but not natively available in CSS, it enables you to write more modular, maintainable, and efficient style sheets.

## ✨ Key Features

- **Conditional Logic**: Use the @if and @else directives to conditionally apply styles based on custom expressions. This allows you to create different style rules for different scenarios, such as different screen sizes or user preferences.
- **Loop Structures**: With the @for and @each directives, you can generate repetitive CSS code in a more concise and organized way. This is especially useful when dealing with a set of similar elements or creating responsive grids.
- **Enhanced CSS**: By adding programming-like features to CSS, PostCSS-Magic enables developers to write more complex and dynamic style sheets, reducing code duplication and improving code readability.

## 🍿 Getting Started

### Installation

Install PostCSS-Magic via npm:

```bash
npm install postcss-magic --save-dev

yarn add postcss-magic --save-dev

pnpm add postcss-magic --save-dev

```

Include it in your PostCSS configuration file (usually postcss.config.js):

```javascript
module.exports = {
  plugins: {
    "postcss-magic": {},
  },
};
```

### Configuration in Vite (vite.config.ts)

```typescript
 css: {
    postcss: {
      plugins: [CssMagic()],
    },
  },

```

## ☕ Usage

Here is a simple example of using @if and @else in CSS:

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

And an example of using @for to generate a series of classes:

```css
@for $i from 1 to 5 {
  .box - $(i) {
    width: 10px _ $i;
    height: 10px _ $i;
  }
}
```

## Contributing

We welcome contributions from the community! If you have any ideas, bug fixes, or improvement suggestions, feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License. For details, please refer to the LICENSE file.
