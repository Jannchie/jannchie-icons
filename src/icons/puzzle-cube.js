import { crisp, rounded, through } from '../geometry'
import { knock, solid } from '../solid'

// 魔方：等距视角的立方体（六边形 + Y 形棱）+ 每个面一横一竖的分格线（2 × 2）
// 中心 x = 12、半宽 8（左右竖边 4 / 20），斜棱接近 30°
const [c, w] = [12, 8]
const [top, upper, mid, lower, bottom] = [2.5, 7.25, 12, 16.75, 21.5]
const p = ([x, y]) => `${x} ${y}`
const line = (a, b) => `M${p(a)}L${p(b)}`
export default ({ radius }) => [
  rounded([[c, top], [c + w, upper], [c + w, lower], [c, bottom], [c - w, lower], [c - w, upper]], crisp(radius)),
  `M${p([c - w, upper])}L${p([c, mid])}L${p([c + w, upper])}`,
  `M${c} ${mid}V${bottom}`,
  { d: line([c - w / 2, (top + upper) / 2], [c + w / 2, (upper + mid) / 2]), thin: true },
  { d: line([c + w / 2, (top + upper) / 2], [c - w / 2, (upper + mid) / 2]), thin: true },
  { d: `M${c - w / 2} ${(upper + mid) / 2}V${(lower + bottom) / 2}`, thin: true },
  { d: line([c - w, mid], [c, lower]), thin: true },
  { d: `M${c + w / 2} ${(upper + mid) / 2}V${(lower + bottom) / 2}`, thin: true },
  { d: line([c + w, mid], [c, lower]), thin: true },
]

// 分格线 a→b 沿垂直方向朝 q（这一格挨着的外边上的点）平移 d
function toward([ax, ay], [bx, by], [qx, qy], d) {
  const l = Math.hypot(bx - ax, by - ay)
  let [nx, ny] = [-(by - ay) / l, (bx - ax) / l]
  if (nx * (qx - ax) + ny * (qy - ay) < 0)
    [nx, ny] = [-nx, -ny]
  return [[ax + nx * d, ay + ny * d], [bx + nx * d, by + ny * d]]
}

// 实心：六边形一块，Y 形棱和分格细线都整条挖穿，碰到外轮廓的那头穿出去：三个面各分成四个小格，十二块各自独立
// 每个面的可见部分从 Y 形棱的缝（中心线外半个线宽）到外缘（中心线外半个线宽），比中心线围成的面整体往外偏半个线宽，
// 分格线跟着朝外边平移半个线宽，四个小格才一样大
export const fill = ({ radius, stroke }) => {
  const s = 2 * stroke
  const o = [c, mid]
  const grid = ([a, b, q], s0, s1) => through(...toward(a, b, q, stroke / 2), s0, s1)
  return [
    solid(rounded([[c, top], [c + w, upper], [c + w, lower], [c, bottom], [c - w, lower], [c - w, upper]], crisp(radius))),
    knock([through(o, [c - w, upper], 0, s), through(o, [c + w, upper], 0, s), through(o, [c, bottom], 0, s)]),
    knock([
      grid([[c - w / 2, (top + upper) / 2], [c + w / 2, (upper + mid) / 2], [c, top]], s, 0),
      grid([[c + w / 2, (top + upper) / 2], [c - w / 2, (upper + mid) / 2], [c, top]], s, 0),
      grid([[c - w / 2, (upper + mid) / 2], [c - w / 2, (lower + bottom) / 2], [c - w, mid]], 0, s),
      grid([[c - w, mid], [c, lower], [c, bottom]], s, 0),
      grid([[c + w / 2, (upper + mid) / 2], [c + w / 2, (lower + bottom) / 2], [c + w, mid]], 0, s),
      grid([[c + w, mid], [c, lower], [c, bottom]], s, 0),
    // 内端停在 Y 形棱的缝里：用圆线帽，尖角模式下方线帽的角不会戳进隔壁的面
    ].map(d => ({ d, thin: true, round: true }))),
  ]
}
