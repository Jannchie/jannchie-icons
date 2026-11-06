import { rounded } from '../geometry'
import { knock, solid } from '../solid'

// CPU：方形封装 + 四边各四根引脚 + 内部核心方块
// 引脚间距 3，落在 7.5 / 10.5 / 13.5 / 16.5 上（三根时中间那根只能在 12，不清晰）
const PINS = [7.5, 10.5, 13.5, 16.5]
export default ({ radius }) => [
  rounded([[5.5, 5.5], [18.5, 5.5], [18.5, 18.5], [5.5, 18.5]], Math.min(radius, 1.5)),
  rounded([[8.5, 8.5], [15.5, 8.5], [15.5, 15.5], [8.5, 15.5]], Math.min(radius, 0.75)),
  ...PINS.flatMap(v => [`M${v} 2.5V5.5`, `M${v} 18.5V21.5`, `M2.5 ${v}H5.5`, `M18.5 ${v}H21.5`]),
]

// 实心：封装一块，挖掉核心方块的轮廓（核心留成实心），引脚照旧是线
export const fill = ({ radius }) => [
  solid(rounded([[5.5, 5.5], [18.5, 5.5], [18.5, 18.5], [5.5, 18.5]], Math.min(radius, 1.5))),
  knock(rounded([[8.5, 8.5], [15.5, 8.5], [15.5, 15.5], [8.5, 15.5]], Math.min(radius, 0.75))),
  ...PINS.flatMap(v => [`M${v} 2.5V5.5`, `M${v} 18.5V21.5`, `M2.5 ${v}H5.5`, `M18.5 ${v}H21.5`]),
]
