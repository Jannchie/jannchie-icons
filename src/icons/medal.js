import { circle } from '../geometry'

// 奖牌：上方 V 形挂带（一整条轮廓，顶边中间凹进一个 V 口，两条斜边正好收在圆牌边上）+ 下方的圆牌 + 牌里一道细内圈
export default () => [
  'M10.1 9.57L7 2.5H10.5L12 6L13.5 2.5H17L13.9 9.57',
  circle(12, 15, 5.75),
  { d: circle(12, 15, 3), thin: true },
]
