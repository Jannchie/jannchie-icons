import { rounded } from '../geometry'
import { knock, solid } from '../solid'

// 烧杯：左上的倒嘴 + 圆角直筒杯身 + 右侧三道刻度
const ticks = [[14.5, 8.5], [16, 12.5], [14.5, 16.5]]

export default ({ radius }) => [
  rounded([[4, 3.5], [5.5, 3.5], [5.5, 20.5], [18.5, 20.5], [18.5, 3.5]], Math.min(radius, 1.5), false),
  ...ticks.map(([x, y]) => `M${x} ${y}H18.5`),
]

// 实心：杯身封口成一块（上沿两个角是直角，和描边版的杯口一样），倒嘴照旧是线；
// 刻度挖空，右端穿出杯壁：从外侧切进来的缺口（同尺子的刻度），不在杯壁里停成一头封死的槽
export const fill = ({ radius, stroke }) => {
  const r = Math.min(radius, 1.5)
  return [
    solid(rounded([[5.5, 3.5, 0], [5.5, 20.5], [18.5, 20.5], [18.5, 3.5, 0]], r)),
    'M4 3.5H5.5',
    knock(ticks.map(([x, y]) => `M${x} ${y}H${18.5 + stroke}`)),
  ]
}
