import { rounded } from '../geometry'

// PS 触控板：横向圆角大板 + 中间一道分区虚线
export default ({ radius }) => [
  rounded([[2.5, 6], [21.5, 6], [20, 18], [4, 18]], Math.min(radius, 2.5)),
  'M12 6V8',
  'M12 11V13',
  'M12 16V18',
]
