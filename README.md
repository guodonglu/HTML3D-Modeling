# HTML 3D 交互建模工坊 (HTML3D-Modeling)

[![Deploy to GitHub Pages](https://github.com/guodonglu/HTML3D-Modeling/actions/workflows/deploy-pages.yml/badge.svg)](https://github.com/guodonglu/HTML3D-Modeling/actions/workflows/deploy-pages.yml)
[![GitHub Pages](https://img.shields.io/badge/Live%20Demo-GitHub%20Pages-blue.svg)](https://guodonglu.github.io/HTML3D-Modeling/)
[![Three.js](https://img.shields.io/badge/Three.js-r128-black.svg?logo=three.js)](https://threejs.org/)
[![Echo Hybrid Hub](https://img.shields.io/badge/Integration-Echo%20App-007AFF.svg)](https://github.com/guodonglu/macmini-hub)

基于 WebGL 与 Three.js 的轻量级单文件 3D 交互结构建模工程集合，作为 **Echo** 智能中枢的自动化 3D 资源库与在线渲染服务。

---

## 🌟 仓库特色

1. **单文件即插即用 (Single-file Portable HTML)**：
   - 每一个 3D 建模均为独立的 `.html` 文件，内含 Three.js 场景渲染、物理/运动学数学解析、PBR 工业材质以及响应式工程控制面板。
   - 零繁琐构建步骤，任何现代浏览器双击即可在本地离线运行。
2. **自动化索引与清单生成 (Automated Manifest & GitHub Actions)**：
   - 只要向本仓库提交任何新的 `*.html` 建模文件，GitHub Actions 会自动触发 `scripts/generate-manifest.mjs`，提取 `<title>` 与描述，动态更新 `models.json` 并发布至 GitHub Pages。
3. **Echo 私有中枢实时同步 (Auto-sync to Echo Hub)**：
   - 移动端套件 Echo（React Native + Web Hybrid App）已无缝集成该仓库：
   - 自动轮询与拉取本仓库所有 3D 建模，在工作台中以 Apple HIG 质感卡片展示，支持多轴自由旋转、爆炸拆解、零件工程百科与全屏沉浸式交互。

---

## 🛠️ 当前已纳管 3D 建模清单

| 文件名 | 模型名称 | 技术栈 / 特色功能 | 在线实时交互 |
| :--- | :--- | :--- | :--- |
| [`shimano-mt200.html`](./shimano-mt200.html) | **禧玛诺 MT200 液压碟刹总成 3D 结构建模** | Three.js r128 + OrbitControls<br>• 0~100% 爆炸视图轴向展开<br>• 捏刹制动力与粉色矿物油流动模拟<br>• 矩形密封圈弹性剪切回位机理演示<br>• 无碟片误捏（活塞顶脱漏油故障仿真）<br>• 卡钳半透明 X-Ray 剖切油道<br>• 零件点击拾取射线检测与工程百科 | [👉 点击体验](https://guodonglu.github.io/HTML3D-Modeling/shimano-mt200.html) |

---

## 🚀 如何添加新的 3D 建模文件？

非常简单，只需两步：

1. 将你的 3D HTML 建模文件（例如 `drone-quadcopter.html` 或 `v8-engine.html`）放入仓库根目录下；
2. 确保 HTML 的 `<title>` 标签包含模型名称；
3. 执行提交并推送：
   ```bash
   git add .
   git commit -m "feat: add new 3D model"
   git push origin main
   ```
4. GitHub Actions 会自动生成最新的 `models.json` 并发布至 Pages，**你的 Echo 项目将自动感知并展示该全新建模**！

---

## 📱 Echo 项目自动引用接入规范

Echo 项目通过动态请求远端清单或 GitHub Contents API 自动遍历所有模型：

- **清单接口 (Manifest API)**：`https://guodonglu.github.io/HTML3D-Modeling/models.json`
- **GitHub 动态内容接口 (Live Fallback)**：`https://api.github.com/repos/guodonglu/HTML3D-Modeling/contents`
- **单模型在线预览地址**：`https://guodonglu.github.io/HTML3D-Modeling/{filename}`
