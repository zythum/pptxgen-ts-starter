# pptxgen-ts-starter

[English](./README.md) | 中文

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

## 使用 AI 创建演示文稿

与其只对 AI 说“帮我做一个 PPT”，不如先提供一份清晰的 brief。本模板适合让 AI 在当前仓库中创建可编辑、由代码生成的 PowerPoint 幻灯片，而不是截图或静态 HTML。

### 最简单的启动方式

```text
请基于 https://github.com/zythum/pptxgen-ts-starter 创建一个 PPT 项目。
主题是“<你的主题>”。
```

这句提示词足以启动任务，但更完整的 brief 能帮助 AI 生成更好的结构，减少猜测和反复修改。

下面是两个实用示例：

```text
请基于 https://github.com/zythum/pptxgen-ts-starter 创建一个 PPT 项目，主题是“介绍 Kimi K3 模型”。请自行查找并核实公开资料，采用小红书风格，制作 5 页左右的内容。请标注重要信息的来源，不要编造未经验证的事实。
```

```text
请基于 https://github.com/zythum/pptxgen-ts-starter 创建一个 PPT 作为中学语文课件。主题为“《江雪》古诗解析”，采用水墨风格，时长大概 20 分钟。请结合课文内容设计教学结构、讲解重点和课堂互动。
```

### 推荐的 PPT brief

尽可能提供以下信息：

```text
主题：
听众：
使用场景：
演讲时长：
目标页数：
希望听众记住的一句话：
希望听众会后采取的行动：
必须包含的内容：
可以使用的数据和来源：
数据截止时间：
必须使用的图片、Logo 或品牌规范：
希望的视觉风格：
不能出现的内容或结论：
交付要求：PPTX、演讲者备注、PDF、源代码、素材清单等
```

至少应覆盖这八类信息：主题、听众、使用场景、目标、内容素材、页数与时长、视觉方向和交付要求。

### 区分事实和假设

明确标注输入内容，让 AI 知道哪些信息可以直接使用：

- **事实** — 有来源或可以核验的信息，例如“7 月活跃客户数为 1,240”。
- **观点** — 希望演示文稿表达的判断，例如“自助接入是当前最值得加大投入的渠道”。
- **建议** — 提议采取的下一步行动，例如“在两个行业增加模板试点”。
- **待确认** — 缺少依据、不能当作事实展示的信息，例如“客户留存是否受价格影响”。

不要让 AI 编造增长率、市场份额、客户名称、竞品信息、案例结果或其他没有依据的内容。缺少的信息应标记为 `待补充` 或 `需要核验`。

### 一个完整的示例

```text
请基于 https://github.com/zythum/pptxgen-ts-starter 创建一个“杂志风”的 PPTX 项目，主题是“城市更新中的新生活方式”。

听众与目标
听众：关注城市生活方式的品牌和内容团队
场景：20 分钟内部分享
目标：让听众理解“城市更新如何改变生活方式”
页数：10 页

内容大致方向
- 城市空间正在从“通行”转向“停留”
- 老厂房、社区商业和公共空间
- 过去的城市内容 vs 现在的城市内容
- 人们购买的是参与感，而不只是功能

视觉要求
1. 整体像编辑部制作的专题杂志：大标题、留白、图片和短句并置。
2. 画布使用宽屏比例；每页只保留一个主结论。
3. 以黑、米白和灰为基础色，只使用一种亮色作为强调色。
4. 封面和章节页使用大图或大字号；数据页使用清晰的指标或对比结构。
5. 图片先做视觉预检，记录来源、比例、裁切方式和版权状态；没有图片时用程序绘制的图形替代，不要虚构图片来源。
6. 不使用大量圆角卡片，不要把每页做成相同的卡片网格。
```

在本仓库中工作时，应要求 AI 使用现有的 JSX + TypeScript 工作流、`src/token/` 中的共享设计令牌、`src/components/` 中的可复用组件，以及 `.deck/` 工作区。交付前还应验证文本是否适配、图片比例是否正确、类型检查和 lint 是否通过，并确认 PPTX 可以正常生成。最终结果应是可重复生成、可继续编辑的原生 `.pptx` 文件，而不是渲染图片。

## 项目结构

```
pptxgen-ts-starter/
├── scripts/
│   ├── color-tool.ts      # 派生调色板变体 + 检查 WCAG 对比度
│   ├── dev-server.ts      # 开发服务器，浏览器预览
│   ├── estimate-text.ts   # 测量渲染文本高度（防止溢出）
│   ├── generate-pptx.ts   # CLI .pptx 构建器
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

| 命令                | 作用                                                    |
| ------------------- | ------------------------------------------------------- |
| `npm run dev`       | 开发服务器运行在 `localhost:5173`（刷新浏览器查看更改） |
| `npm run generate`  | 构建 `output/presentation.pptx`                         |
| `npm run typecheck` | 类型检查，不输出文件                                    |
| `npm run lint`      | 使用 oxlint 进行代码检查                                |
| `npm run format`    | 使用 oxfmt 进行代码格式化                               |

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

## 设计参考

- Guizang PPT Skill https://github.com/op7418/guizang-ppt-skill
- ppt-master https://github.com/hugohe3/ppt-master
- Tailwind CSS colors https://tailwindcss.com/docs/colors
- McKinsey color reference https://colorcodeguide.com/official/mckinsey
- Monocle style reference https://styles.refero.design/style/9165ecb1-f068-4093-8783-1f3c98898b8a

## Example 一些例子

下面给一些简单案例, 使用的是 `deepseek-v4-flash`。

```text
请基于 https://github.com/zythum/pptxgen-ts-starter 创建一个 PPT 项目，主题是“介绍 Kimi K3 模型”。
请自行查找并核实公开资料，采用小红书风格，制作 5 页左右的内容。请标注重要信息的来源，不要编造未经验证的事实。
```

![https://i.v2ex.co/rgcqSa6N.jpeg](https://i.v2ex.co/rgcqSa6N.jpeg)

---

```text
请基于 https://github.com/zythum/pptxgen-ts-starter 创建一个 PPT 作为中学语文课件。主题为“《江雪》古诗解析”，采用水墨风格，时长大概 20 分钟。
请结合课文内容设计教学结构、讲解重点和课堂互动。
```

![https://i.v2ex.co/5cv2UE1m.jpeg](https://i.v2ex.co/5cv2UE1m.jpeg)

## 致谢

如果你觉得这个项目有用，希望你能在仓库中点个 Star ⭐。

感谢！
