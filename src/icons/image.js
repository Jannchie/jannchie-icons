import { symbolFill } from '../list'
import { image } from '../symbols'

// 图片：相框（方框 + 太阳点 + 45° 山）
export default ({ radius }) => image([12, 12], 2.4, radius)

// 实心：方框填实，山形线、太阳挖空（左下角的山体自成一块，见 list.js 的 symbolFill）
export const fill = ({ radius, stroke }) => symbolFill('image', image([12, 12], 2.4, radius), stroke)
