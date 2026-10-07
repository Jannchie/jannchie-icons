import { rounded } from '../geometry'

// PS 触控板：横向圆角大板 + 中间一道分区虚线（虚线落在 11.5 像素中心）
export default ({ radius }) => [
  rounded([[2.5, 5.5], [21.5, 5.5], [20, 18.5], [4, 18.5]], Math.min(radius, 2.5)),
  'M11.5 5.5V8',
  'M11.5 11V13',
  'M11.5 16V18.5',
]
