# pptxgen-ts-starter

使用 **JSX** + **TypeScript** 配合 [pptxgenjs](https://github.com/gitbrent/PptxGenJS) 创建 PowerPoint 演示文稿的起手模板。声明式编写幻灯片，浏览器实时预览，一键生成专业 `.pptx` 文件。

## 特性

- JSX 语法 — 使用 React 风格组件编写幻灯片（`<Slide>`、`<Text>`、`<Rect>`、`<Image>`）
- TypeScript — 完整的类型安全
- 开发服务器 — 浏览器实时预览
- 导出 — 一条命令生成 `.pptx` 文件
- 丰富的组件集 — 形状、图表、表格、图片、富文本、演讲者备注

## 快速开始

### 1. 使用此模板（推荐）

点击 GitHub 上的 **Use this template** 按钮 — 会在你的账户下创建一个全新的仓库，不共享历史记录。

### 2. 使用 tiged 创建

如果你想先在本地开发，无需先创建 GitHub 仓库。
[tiged](https://github.com/tiged/tiged) 会下载模板的干净副本 — 没有 `.git` 历史、没有上游 remote — 效果和 "Use this template" 一样从零开始，但无需离开终端：

```bash
npx tiged zythum/pptxgen-ts-starter my-presentation
cd my-presentation
npm install
```

### 3. 手动克隆（备选方案）

```bash
git clone https://github.com/zythum/pptxgen-ts-starter.git my-presentation
cd my-presentation
npm install
```

## 项目结构

```
pptxgen-ts-starter/
├── scripts/
│   ├── color-tool.ts      # 派生调色板变体 + 检查 WCAG 对比度
│   ├── dev-server.ts      # 开发服务器，浏览器预览
│   ├── estimate-text.ts   # 测量渲染文本高度（防止溢出）
│   ├── generate.ts        # CLI .pptx 构建器
│   └── image-tool.ts      # 查询图片元数据、裁剪、缩放
├── src/
│   ├── ppt.tsx            # 入口文件 — 在此组合所有幻灯片
│   ├── slides/            # 每个幻灯片一个文件：01-title.tsx、02-*.tsx …
│   ├── components/        # 共享 UI 组件：SlideBackground、SectionHeader、Card
│   ├── token/             # 设计令牌 — 唯一数据源
│   │   ├── colors.ts      #   调色板角色（对应 .deck/spec.md §3）
│   │   └── typography.ts  #   字体 + 字号体系（对应 .deck/spec.md §4）
│   └── media/images/      # 图片资源（路径相对于 src/ppt.tsx）
├── web/
│   └── index.html         # 基于浏览器的 PPTX 查看器
├── .agents/
│   └── skills/
│       ├── pptxgenjsx/    # 组件 API 参考
│       └── design/        # 设计指南：工作流 + 模板与主题
├── .deck/                 # 项目工作区：brief.md / research.md / outline.md / spec.md
├── output/                # 生成的 .pptx 文件
├── AGENTS.md              # 详细的幻灯片编写指南（Agent 主要参考）
├── package.json
├── tsconfig.json
└── .gitignore
```

## 使用方法

本模板包含以下 npm 脚本：

| 命令                | 作用                                                        |
| ------------------- | ----------------------------------------------------------- |
| `npm run dev`       | 开发服务器运行在 `localhost:5173`（刷新浏览器查看更改）      |
| `npm run generate`  | 构建 `output/presentation.pptx`                             |
| `npm run typecheck` | 类型检查，不输出文件                                        |
| `npm run lint`      | 使用 oxlint 进行代码检查                                    |
| `npm run format`    | 使用 oxfmt 进行代码格式化                                   |

### CLI 工具

工具脚本帮助在生成最终 `.pptx` 前验证幻灯片布局和派生设计令牌：

- **`scripts/estimate-text.ts`** — 测量渲染文本高度以防止溢出
- **`scripts/image-tool.ts`** — 查询图片元数据、裁剪或缩放图片
- **`scripts/color-tool.ts`** — 派生调色板变体（提亮 / 加深 / 去饱和）并检查 WCAG 对比度

详细用法和示例请参见 [AGENTS.md](AGENTS.md#cli-tools)。

## 自定义清单

开始定制你的演示文稿：

- 修改 `package.json` 中的 `name` 字段
- 将 `src/slides/` 中的幻灯片文件替换为你自己的内容
- 清理本 `README.md`

## Agent Skills

`.agents/skills/` 目录包含两个技能，教 AI 助手如何在本模板中构建幻灯片：

- **`pptxgenjsx`** — 组件 API 参考：使用 JSX 编写幻灯片所需的每个组件、属性和模式。
- **`design`** — 设计指南：七阶段契约（澄清、调研决策、大纲、规格、组合/视觉作为逐页耦合阶段、QA）以及模板与主题（样式、调色板、排版、核心/注册布局、密度、叙事）。

技能按需加载 — 参见 [AGENTS.md](AGENTS.md#skills) 了解何时及如何使用。

## Agent 指南

详细的编写说明 — 规范、工作流、常见错误和组件 API — 请参见 [AGENTS.md](AGENTS.md)。这是人类贡献者和 AI 编码助手的主要参考文档。

## 致谢

如果你觉得这个项目有用，希望你能在仓库中点个 Star ⭐。

感谢！
