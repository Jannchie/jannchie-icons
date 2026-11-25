import { circle, rounded } from '../geometry'
import { knock, solid } from '../solid'

// 卷尺：方圆的尺盒（3.5–16.5 × 4.5–19.5）+ 盒面正中的圆（卷轴，半径 3.25）+ 从盒底右角顺着底边拉出来的一截尺带（到 20.5），带头一个往上翘的小钩
const box = radius => rounded([[3.5, 4.5], [16.5, 4.5], [16.5, 19.5, Math.min(radius, 0.5)], [3.5, 19.5]], Math.min(radius * 1.5, 3))
const reel = circle(10, 12, 3.25)
const tape = radius => rounded([[16.5, 19.5], [20.5, 19.5], [20.5, 16.5]], Math.min(radius, 0.5), false)

export default ({ radius }) => [box(radius), reel, tape(radius)]

// 实心：尺盒一块，卷轴的圆圈挖空（卷轴留成实心）；尺带照旧是线
export const fill = ({ radius }) => [solid(box(radius)), knock(reel), tape(radius)]
