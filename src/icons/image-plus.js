import { GAP } from '../clearance'
import { clear } from '../solid'
import { image, plus } from '../symbols'
import { imageFill } from './image'

// 插入图片：相框往左上挪，右下角一个加号；加号作为 cut，相框在加号附近真正断开
export default ({ radius }) => [
  ...image([10.5, 10.5], 2.2, radius),
  ...plus([18.5, 18.5], 1.2).map(p => ({ d: p.d ?? p, cut: true, tone: 'success' })),
]

// 实心：相框的实心版（见 image.js 的 imageFill，山形线穿出框外），在加号四周让出缝，再画加号
export const fill = ({ radius, stroke }) => {
  const sign = plus([18.5, 18.5], 1.2).map(p => ({ d: p.d ?? p, tone: 'success' }))
  return [...imageFill(image([10.5, 10.5], 2.2, radius), stroke), clear(sign, GAP), ...sign]
}
