import { plane } from '../plane'
import { solid } from '../solid'

// 客机（俯视，机头朝右）：圆钝机头、后掠主翼加平直后缘、小平尾，见 plane.js
export default ({ radius }) => plane(radius)

// 实心：机身一块
export const fill = ({ radius }) => solid(plane(radius))
