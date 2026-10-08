import { crisp, rounded } from '../geometry'

// 多个文件：前面一张纸（右上折角，和 file 一样的 45° 折角画法）+ 身后一张纸只露出左边和底边，画成一条 L 线
// 墨迹框左右 3–21、上下 2–22，以画布中线对称；线宽变粗时外缘不动、往里长（h 是半个线宽）：
// 前纸的顶边、右边和 L 线的左边、底边是外缘；前纸的左边、底边和 L 线隔 4（中心线），L 线的两端也离前纸的顶边、右边 4
// 线宽 1 时竖线 3.5 / 7.5 / 15.5 / 20.5、横线 2.5 / 7.5 / 17.5 / 21.5 都落在 .5 上
// 折角的翻折线（x 15.5、y 7.5）固定，斜边两端随线宽各收半个线宽，始终是 45°
const FOLD_X = 15.5
const FOLD_Y = 7.5

export default ({ radius, stroke }) => {
  const h = stroke / 2
  const [l, t, r, b] = [3 + h, 2 + h, 21 - h, 22 - h]
  const [fl, fb] = [l + 4, b - 4]
  return [
    rounded([[fl, t], [FOLD_X, t, crisp(radius)], [r, FOLD_Y, crisp(radius)], [r, fb], [fl, fb]], radius),
    `M${FOLD_X} ${t}V${FOLD_Y}H${r}`,
    rounded([[l, t + 4], [l, b], [r - 4, b]], radius, false),
  ]
}
