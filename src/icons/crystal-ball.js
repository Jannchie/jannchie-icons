import { circle, rounded } from '../geometry'
import { knock, solid } from '../solid'

// 水晶球：球（圆心 (12, 9.5)、半径 6.5）+ 左上一道反光弧 + 下面梯形的底座
const ball = circle(12, 9.5, 6.5)
const shine = 'M8 9.5A4 4 0 0 1 12 5.5'
const base = radius => rounded([[7.5, 18.5], [16.5, 18.5], [18.5, 20.5], [5.5, 20.5]], Math.min(radius, 1))

export default ({ radius }) => [ball, shine, base(radius)]

// 实心：球一块、挖掉反光；底座一块
export const fill = ({ radius }) => [solid(ball), knock(shine), solid(base(radius))]
