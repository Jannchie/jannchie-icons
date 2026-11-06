import { circle } from '../geometry'
import { ring } from '../marks'
import { knock, solid } from '../solid'

// 筹码：外圈 + 内圈 + 外圈上下左右四道刻痕（刻痕在中轴上）
export default ({ radius }) => [
  ring(),
  circle(12, 12, 5),
  'M12 3V7',
  'M12 17V21',
  'M3 12H7',
  'M17 12H21',
]

// 实心：筹码一块，挖掉内圈和四道刻痕；刻痕外端伸出外缘，把外圈切成四段（筹码边上的色块）
export const fill = ({ stroke }) => [
  solid(ring()),
  knock([circle(12, 12, 5), `M12 ${3 - stroke}V7`, `M12 17V${21 + stroke}`, `M${3 - stroke} 12H7`, `M17 12H${21 + stroke}`]),
]
