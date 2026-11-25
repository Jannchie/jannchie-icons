import { eye } from '../scene'

// 渐变：4 × 4 的网点，从左到右一列比一列小（直径 3.5 → 2.75 → 2 → 1.25），像半色调的渐变
// 网点总是圆的，粗字重下不再变大（eye）：再大左边两列就连成一片了。墨迹左右 3–21：最大一列的左缘在 3，最小一列的右缘在 21
const SIZES = [3.5, 2.75, 2, 1.25]
const f = v => +v.toFixed(3)
const [x0, x1] = [3 + SIZES[0] / 2, 21 - SIZES[3] / 2]
const [y0, y1] = [3 + SIZES[0] / 2, 21 - SIZES[0] / 2]
const dots = SIZES.flatMap((size, i) => [0, 1, 2, 3].map(j => eye(f(x0 + (x1 - x0) * i / 3), f(y0 + (y1 - y0) * j / 3), size)))

export default () => dots
