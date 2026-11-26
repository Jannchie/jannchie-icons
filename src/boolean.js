import { rounded } from './geometry'
import { solid } from './solid'

// 布尔运算（设计软件的路径运算）：boolean-union / boolean-subtract / boolean-intersect / boolean-exclude 四个图标共用的几何
// 左上、右下两个交叠的圆角方块（墨迹 3–16.5 和 7.5–21，各 13.5 见方，交叠 9 见方，线宽变粗往里长）；右下的方块在上层
// 运算留下的区域画 45° 细阴影线（和 mask 一样：阴影线 = 选中的区域），实心版把留下的区域填实
// 和数学符号 union（∪）、intersection（∩）不是一回事，所以名字带 boolean- 前缀

// 45° 阴影线 x + y = c，裁进一组矩形（中心线坐标 [x0, y0, x1, y1]）；矩形相接或交叠的地方连成一条
const hatch = (rects, cs) => cs.flatMap((c) => {
  const spans = rects.map(([x0, y0, x1, y1]) => [Math.max(x0, c - y1), Math.min(x1, c - y0)]).filter(([s, e]) => e > s).sort((p, q) => p[0] - q[0])
  const merged = []
  for (const [s, e] of spans) {
    if (merged.length && s <= merged.at(-1)[1] + 1e-6)
      merged.at(-1)[1] = Math.max(merged.at(-1)[1], e)
    else
      merged.push([s, e])
  }
  return merged.map(([s, e]) => ({ d: `M${+s.toFixed(3)} ${+(c - s).toFixed(3)}L${+e.toFixed(3)} ${+(c - e).toFixed(3)}`, thin: true, round: true }))
})

// 两个方块和它们分出来的三个区域；两个方块的轮廓相交的那两个角（交界角）是尖的，其余的角跟着全局圆角
function parts(radius, stroke) {
  const h = stroke / 2
  const [a0, a1, b0, b1] = [3 + h, 16.5 - h, 7.5 + h, 21 - h]
  const r = Math.min(radius, 2)
  return {
    back: rounded([[a0, a0], [a1, a0], [a1, a1], [a0, a1]], r),
    front: rounded([[b0, b0], [b1, b0], [b1, b1], [b0, b1]], r),
    // 左上方块被右下方块挡住的那个角不画：一条 L 形折线，两头落在右下方块的中心线上
    backOpen: rounded([[a1, b0], [a1, a0], [a0, a0], [a0, a1], [b0, a1]], r, false),
    whole: rounded([[a0, a0], [a1, a0], [a1, b0, 0], [b1, b0], [b1, b1], [b0, b1], [b0, a1, 0], [a0, a1]], r),
    onlyBack: rounded([[a0, a0], [a1, a0], [a1, b0, 0], [b0, b0], [b0, a1, 0], [a0, a1]], r),
    onlyFront: rounded([[a1, b0, 0], [b1, b0], [b1, b1], [b0, b1], [b0, a1, 0], [a1, a1]], r),
    both: rounded([[b0, b0], [a1, b0, 0], [a1, a1], [b0, a1, 0]], r),
    hatchWhole: hatch([[a0, a0, a1, a1], [b0, b0, b1, b1]], [12, 18, 24, 30, 36]),
    hatchBack: hatch([[a0, a0, a1, b0], [a0, b0, b0, a1]], [12, 18]),
    hatchFront: hatch([[b0, a1, b1, b1], [a1, b0, b1, a1]], [30, 36]),
    hatchBoth: hatch([[b0, b0, a1, a1]], [21, 27]),
  }
}

// 每种运算的描边版和实心版：p 是 parts() 的结果
const OPS = {
  // 合并：两个方块连成一个轮廓，整块都是结果
  union: {
    draw: p => [p.whole, ...p.hatchWhole],
    fill: p => [solid(p.whole)],
  },
  // 减去顶层：右下方块整个画出来，左上方块只留没被挡住的 L 形
  subtract: {
    draw: p => [p.backOpen, p.front, ...p.hatchBack],
    fill: p => [solid(p.onlyBack), p.front],
  },
  // 交集：只留交叠的小方块
  intersect: {
    draw: p => [p.back, p.front, ...p.hatchBoth],
    fill: p => [solid(p.both), p.back, p.front],
  },
  // 排除重叠：两个 L 形都留，交叠的小方块露白
  exclude: {
    draw: p => [p.back, p.front, ...p.hatchBack, ...p.hatchFront],
    fill: p => [solid(p.onlyBack), solid(p.onlyFront), p.back, p.front],
  },
}

export const boolean = op => ({ radius, stroke }) => OPS[op].draw(parts(radius, stroke))
export const booleanFill = op => ({ radius, stroke }) => OPS[op].fill(parts(radius, stroke))
