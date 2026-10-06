import { rounded } from '../geometry'

// 闪电：上下两段斜笔，中间一道水平错位
export default ({ radius }) => [
  rounded([[13.5, 2.5], [5, 13.5], [11.5, 13.5], [10.5, 21.5], [19, 10.5], [12.5, 10.5]], Math.min(radius, 1)),
]
