import { crisp, rounded } from '../geometry'

// 魔方：等距视角的立方体（六边形 + Y 形棱）+ 每个面一横一竖的分格线（2 × 2）
// 像素网格：居中的竖棱要落在 .5 上，中心取 x = 11.5、半宽 8（左右竖边 3.5 / 19.5），斜棱接近 30°
const [c, w] = [11.5, 8]
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
