import { rounded } from '../geometry'
import { knock, solid } from '../solid'

// 俄罗斯方块：一个 T 形块（一整块轮廓 + 细线分成四格），格子 6 见方，居中摆放
export default ({ radius }) => [
  rounded([[3, 6], [21, 6], [21, 12], [15, 12], [15, 18], [9, 18], [9, 12], [3, 12]], Math.min(radius, 1)),
  { d: 'M9 6V12', thin: true },
  { d: 'M15 6V12', thin: true },
  { d: 'M9 12H15', thin: true },
]

// 实心：T 形一块，挖掉分格细线；碰到上沿的两条竖线从上沿往下缩一个线宽，不在外轮廓上咬出缺口
export const fill = ({ radius, stroke }) => [
  solid(rounded([[3, 6], [21, 6], [21, 12], [15, 12], [15, 18], [9, 18], [9, 12], [3, 12]], Math.min(radius, 1))),
  knock([`M9 ${6 + stroke}V12`, `M15 ${6 + stroke}V12`, 'M9 12H15'].map(d => ({ d, thin: true }))),
]
