import { rounded } from '../geometry'

// 俄罗斯方块：一个 T 形块（一整块轮廓 + 细线分成四格），格子 6 见方；边落在 .5 上，整体往左上偏半格
export default ({ radius }) => [
  rounded([[2.5, 5.5], [20.5, 5.5], [20.5, 11.5], [14.5, 11.5], [14.5, 17.5], [8.5, 17.5], [8.5, 11.5], [2.5, 11.5]], Math.min(radius, 1)),
  { d: 'M8.5 5.5V11.5', thin: true },
  { d: 'M14.5 5.5V11.5', thin: true },
  { d: 'M8.5 11.5H14.5', thin: true },
]
