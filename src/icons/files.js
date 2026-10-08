import { crisp, rounded } from '../geometry'

// 多个文件：前面一张纸（8.5–20.5 × 2.5–16.5，右上折角 5，和 file 一样的折角画法）+ 身后一张纸只露出左边和底边，
// 画成一条 L 线（4.5 / 20.5），和前纸的左边、底边各隔 4；竖线 4.5 / 8.5 / 20.5、横线 2.5 / 16.5 / 20.5 都落在 .5 上
const [l, t, r, b] = [8.5, 2.5, 20.5, 16.5]
const fold = 5

export default ({ radius }) => [
  rounded([[l, t], [r - fold, t, crisp(radius)], [r, t + fold, crisp(radius)], [r, b], [l, b]], radius),
  `M${r - fold} ${t}V${t + fold}H${r}`,
  rounded([[4.5, 6.5], [4.5, 20.5], [16.5, 20.5]], radius, false),
]
