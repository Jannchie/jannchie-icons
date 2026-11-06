import { rounded } from '../geometry'
import { knock, solid } from '../solid'

// PS 触控板：横向圆角大板 + 中间一道分区虚线（虚线落在 11.5 像素中心）
export default ({ radius }) => [
  rounded([[2.5, 5.5], [21.5, 5.5], [20, 18.5], [4, 18.5]], Math.min(radius, 2.5)),
  'M11.5 5.5V8',
  'M11.5 11V13',
  'M11.5 16V18.5',
]

// 实心：触控板一块，挖掉分区虚线；首尾两段从板边往里缩一个线宽，不把板子切开
export const fill = ({ radius, stroke }) => [
  solid(rounded([[2.5, 5.5], [21.5, 5.5], [20, 18.5], [4, 18.5]], Math.min(radius, 2.5))),
  knock([`M11.5 ${5.5 + stroke}V8`, 'M11.5 11V13', `M11.5 16V${18.5 - stroke}`]),
]
