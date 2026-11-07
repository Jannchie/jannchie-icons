import { GAP } from '../clearance'
import { circle } from '../geometry'
import { clear, solid } from '../solid'

// 十字准星：圆 + 四个方向伸出圆外的短线（中心留空）
const ticks = ['M12 3V8', 'M12 16V21', 'M3 12H8', 'M16 12H21']
export default () => [circle(12, 12, 6.5), ...ticks]

// 实心：圆一块；四道短线整条照旧是线（从圆外一直伸到圆里），圆在短线四周让出 GAP 的缝——短线像压在圆盘上，没有停在实心里的槽
export const fill = () => [
  solid(circle(12, 12, 6.5)),
  clear(ticks, GAP),
  ...ticks,
]
