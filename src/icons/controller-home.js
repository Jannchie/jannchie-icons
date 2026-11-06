import { ring } from '../marks'
import { rounded } from '../geometry'
import { knock, solid } from '../solid'

// 手柄主页键（不用品牌徽标）：圆圈 + 小房子
export default ({ radius }) => [
  ring(),
  rounded([[12, 7.5], [16.5, 11.5], [16.5, 16.5], [7.5, 16.5], [7.5, 11.5]], Math.min(radius, 1)),
]

// 实心：圆片上挖出小房子
export const fill = ({ radius }) => [
  solid(ring()),
  knock(rounded([[12, 7.5], [16.5, 11.5], [16.5, 16.5], [7.5, 16.5], [7.5, 11.5]], Math.min(radius, 1))),
]
