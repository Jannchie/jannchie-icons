import { frame } from '../ai'
import { through } from '../geometry'
import { knock, solid } from '../solid'

// Hugging Face 任务：深度估计。相框里一条地平线，和一条从近处通向远处、越来越窄的路：一眼看得出远近
// 库里的 hallway 是嵌套方框 + 四条对角线，layers 是叠起来的几层，perspective 是梯形
// 相框外缘 3–21；地平线的墨迹上缘在 9（线宽变粗时往下长）。路的两条边从底边的 6.75 / 17.25 收到地平线上的 10.5 / 13.5：
// 两条边在地平线处还隔着 1.5，不会在远处糊成一团
const scene = (stroke) => {
  const h = stroke / 2
  const [l, r, b, y] = [3 + h, 21 - h, 21 - h, 9 + h]
  return { horizon: [[l, y], [r, y]], left: [[10.5, y], [6.75, b]], right: [[13.5, y], [17.25, b]] }
}
const line = ([a, b]) => `M${a[0]} ${a[1]}L${b[0]} ${b[1]}`

export default ({ radius, stroke }) => {
  const { horizon, left, right } = scene(stroke)
  return [frame(stroke, radius), line(horizon), line(left), line(right)]
}

// 实心：相框一块；地平线两端穿出框外，路的两条边从地平线一直穿出底边——天空、路面、左右两块地各自独立，没有死胡同
export const fill = ({ radius, stroke }) => {
  const { horizon, left, right } = scene(stroke)
  const e = 2 * stroke
  return [solid(frame(stroke, radius)), knock([through(...horizon, e), through(...left, 0, e), through(...right, 0, e)])]
}
