import { rounded } from '../geometry'
import { knock, solid } from '../solid'

// 半墙：wall 只砌到一半高——墙体 3.5–19.5 × 12.5–20.5，两层砖（横缝 16.5），竖缝错开（上层 11.5，下层 7.5 / 15.5）
export default ({ radius }) => [
  rounded([[3.5, 12.5], [19.5, 12.5], [19.5, 20.5], [3.5, 20.5]], Math.min(radius, 1)),
  'M3.5 16.5H19.5',
  'M11.5 12.5V16.5',
  'M7.5 16.5V20.5',
  'M15.5 16.5V20.5',
]

// 实心：墙体一块，挖掉砖缝（一块块砖分开）
export const fill = ({ radius, stroke }) => [
  solid(rounded([[3.5, 12.5], [19.5, 12.5], [19.5, 20.5], [3.5, 20.5]], Math.min(radius, 1))),
  // 砖缝碰到墙边的一端多伸一个线宽，把墙切干净，不留连着的细丝
  knock([`M${3.5 - stroke} 16.5H${19.5 + stroke}`, `M11.5 ${12.5 - stroke}V16.5`, `M7.5 16.5V${20.5 + stroke}`, `M15.5 16.5V${20.5 + stroke}`]),
]
