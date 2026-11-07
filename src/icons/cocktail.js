import { rounded } from '../geometry'
import { cutout, solid } from '../solid'

// 鸡尾酒：45° 斜边的三角杯 + 液面 + 杯脚 + 底座
export default ({ radius }) => [
  // 杯脚在中轴 12 上；杯口半宽 8，保持 45°
  rounded([[4, 3.5], [20, 3.5], [12, 11.5]], Math.min(radius, 1)),
  'M7 6.5H17',
  'M12 11.5V20.5',
  'M8 20.5H16',
]

// 实心：杯身一块，液面挖成一道缝：上下边是液面线的墨迹（6.5 ± 半个线宽），两端平行于杯壁、停在杯壁的内缘（和描边版一样厚的壁），
// 缝是一个梯形，不是两头圆的横条；杯脚、底座照旧是线
// 杯壁中心线：左 x = y + 0.5，右 x = 23.5 − y；45° 的线往里收半个线宽，水平方向收 h·√2
function liquid(stroke) {
  const h = stroke / 2
  const k = h * Math.SQRT2
  const [y0, y1] = [6.5 - h, 6.5 + h]
  return `M${y0 + 0.5 + k} ${y0}H${23.5 - y0 - k}L${23.5 - y1 - k} ${y1}H${y1 + 0.5 + k}Z`
}
export const fill = ({ radius, stroke }) => [
  solid(rounded([[4, 3.5], [20, 3.5], [12, 11.5]], Math.min(radius, 1))),
  cutout(liquid(stroke)),
  'M12 11.5V20.5',
  'M8 20.5H16',
]
