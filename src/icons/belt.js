import { frame } from '../geometry'
import { dot } from '../scene'
import { knock, solid } from '../solid'

// 皮带：一条横着的皮带（9.5–14.5），正中套着一个比皮带高的方形带扣（外缘 7–15 × 6–18），扣里一根横着的扣针；
// 皮带左段从带扣伸到 3.5 平切，右段伸到 21 收成尖头，右段上一个扣眼
// 带扣 + 尖头 + 扣眼是皮带的记号；左右两段的线都接在带扣竖边的中心线上
const buckle = (stroke, radius) => frame(stroke, Math.min(radius, 1.5), [7, 6, 15, 18])
const left = h => `M${7 + h} 9.5H3.5V14.5H${7 + h}`
const right = h => `M${15 - h} 9.5H18.5L21 12L18.5 14.5H${15 - h}`
const prong = h => `M${7 + h} 12H12`
const hole = { ...dot(17.5, 12), round: true }

export default ({ stroke, radius }) => {
  const h = stroke / 2
  return [left(h), right(h), buckle(stroke, radius), prong(h), hole]
}

// 实心：左右两段皮带各一块，扣眼挖成圆孔；带扣、扣针照旧是线
export const fill = ({ stroke, radius }) => {
  const h = stroke / 2
  return [solid([`${left(h)}Z`, `${right(h)}Z`]), knock(hole), buckle(stroke, radius), prong(h)]
}
