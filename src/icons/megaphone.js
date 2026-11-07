import { GAP } from '../clearance'
import { crisp, rounded } from '../geometry'
import { solid } from '../solid'

// 喇叭（扩音器）：左边一个方形后座（3.5–9.5 × 7.5–13.5）接一个往右张开的喇叭口（右沿 20.5，3.5–17.5），
// 后座和喇叭口之间一道竖线；后座下面挂一个把手（5.5–9.5，往下到 19.5，右边沿用分隔竖线）
// 竖线 3.5 / 5.5 / 9.5 / 20.5、横线 7.5 / 13.5 / 19.5 都落在 .5 上
export default ({ radius }) => [
  rounded([[3.5, 7.5], [9.5, 7.5], [20.5, 3.5], [20.5, 17.5], [9.5, 13.5], [3.5, 13.5]], Math.min(radius, 1.5)),
  'M9.5 7.5V13.5',
  rounded([[5.5, 13.5], [5.5, 19.5], [9.5, 19.5], [9.5, 13.5]], Math.min(radius, 1.5), false),
]

// 实心：后座、喇叭口各画一块，两块之间留 GAP 的竖缝（描边版里两者共用 9.5 这条竖线；挖一道线的话线帽停在顶点、底边的中线上，
// 两头各留一道细桥）。后座按墨迹范围原样画（见 solid.js 的 tile），右缘停在缝的左边；喇叭口的左边挪到缝的右边，
// 沿上下两条斜边取点；把手跟着后座往左挪到右腿外缘贴齐后座右缘（描边版的右腿就是分隔竖线，留在缝里会被切成两条细条）。
// 后座上面两个角和描边版的墨迹一样圆；下面右角是直角、左角只收 crisp 小圆角，把手的两条腿从底边上接出去不留缺口
export const fill = ({ radius, stroke, sharp }) => {
  const h = stroke / 2
  const r = Math.min(radius, 1.5)
  const [seat, horn] = [9.5 - GAP / 2, 9.5 + GAP / 2 + h]
  const dx = 9.5 - seat + h
  const slope = 4 / 11
  const [top, low] = sharp ? [0, 0] : [r + h, crisp(radius)]
  return [
    { d: rounded([[3.5 - h, 7.5 - h], [seat, 7.5 - h], [seat, 13.5 + h, 0], [3.5 - h, 13.5 + h, low]], top), fill: true, exact: true },
    solid(rounded([[horn, 7.5 - (horn - 9.5) * slope], [20.5, 3.5], [20.5, 17.5], [horn, 13.5 + (horn - 9.5) * slope]], r)),
    rounded([[5.5 - dx, 13.5], [5.5 - dx, 19.5], [9.5 - dx, 19.5], [9.5 - dx, 13.5]], r, false),
  ]
}
