// 路径样式标记到实际线宽的换算：绘制函数用 thin、detail、badge、dot、eye 这些标记描述「哪种线」，
// 收尾（svg.js）、实心版（fill.js）、角标定位（corner.js）都按这里换算成具体线宽和点径
// 只是常量和纯函数，不依赖别的模块

// 尖角的斜接上限：超过就退成斜切。render.js 的 stroke-miterlimit、fill.js 的外扩、svg.js 的线头检测都用它
export const MITER_LIMIT = 2

// 点的默认直径（线宽 DOT_STROKE 下）；scene.js 的 dot、eye 也用它
export const DOT = 2
// 各类线条的实际线宽：thin（内部细线）是外框的 THIN 倍
export const THIN = 0.7
// detail（缩小放进外框里的符号：系列的居中符号、列表符号）和 badge（系列图标的角标）比外框细：
// 外框线宽的 DETAIL_RATIO 倍，封顶 DETAIL_STROKE——外框和里面的符号一粗一细，符号细节在小尺寸下更清楚
export const DETAIL_RATIO = 0.8
export const DETAIL_STROKE = 1.25
// relief 是拥挤检测（svg.js 的 relieve）给出的退让线宽，只会让线变细
export const widthOf = (item, stroke) => Math.min(item.thin ? stroke * THIN : item.badge || item.detail ? Math.min(stroke * DETAIL_RATIO, DETAIL_STROKE) : stroke, item.relief ?? Infinity)
// 点：显式给了 dot 直径，或者是字符串写的零长度路径（M x y h0，按默认直径 DOT）
export const dotSize = item => item.dot ?? (/^(?:M[^MLHVCSQTAZ]+h0)+$/i.test(item.d.replace(/\s+/g, '')) ? DOT : 0)
// 点的直径是按线宽 DOT_STROKE 设计的，实际按字重等比缩放：点和线的粗细比例在任何字重下都一样
// （默认 DOT 2 : 线宽 1.5，略大于线宽，补偿圆点看起来比同宽的线小）
export const DOT_STROKE = 1.5
// 眼睛（scene.js 的 eye）例外：粗字重下不再放大，直径停在常规线宽那一档
export const dotWidth = (item, stroke) => dotSize(item) * (item.eye ? Math.min(stroke, DOT_STROKE) : stroke) / DOT_STROKE
