import { GAP } from '../clearance'
import { circle, rounded } from '../geometry'
import { clear, solid } from '../solid'
import { rotate } from '../transform'

// 糖果：中间圆形糖 + 两端蝴蝶结包装，整体沿 \ 方向斜放
export default ({ radius }) => [
  rotate(circle(12, 12, 4), 45),
  rotate(rounded([[8, 12], [3.5, 8.5], [3.5, 15.5]], Math.min(radius, 1)), 45),
  rotate(rounded([[16, 12], [20.5, 8.5], [20.5, 15.5]], Math.min(radius, 1)), 45),
]

// 实心：两端的包装各一块，在糖四周让出缝，糖是实心圆
export const fill = ({ radius }) => {
  const ball = rotate(circle(12, 12, 4), 45)
  return [
    solid(rotate(rounded([[8, 12], [3.5, 8.5], [3.5, 15.5]], Math.min(radius, 1)), 45)),
    solid(rotate(rounded([[16, 12], [20.5, 8.5], [20.5, 15.5]], Math.min(radius, 1)), 45)),
    clear(ball, GAP),
    solid(ball),
  ]
}
