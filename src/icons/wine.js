import { cutout, solid } from '../solid'

// 葡萄酒：杯身 + 液面 + 杯脚 + 底座
export default ({ radius }) => [
  'M7 3.5H17C17 8.5 15.5 12.5 12 12.5C8.5 12.5 7 8.5 7 3.5Z',
  'M7.35 7.5H16.65',
  'M12 12.5V20.5',
  'M8 20.5H16',
]

// 实心：杯身一块，液面挖成一道缝（同 cocktail）：上下边是液面线的墨迹（7.5 ± 半个线宽），两端顺着杯壁、停在杯壁的内缘
// （和描边版一样厚的壁），缝是两端贴着杯壁的一块，不是两头圆的横条；杯脚、底座照旧是线
// 右侧杯壁的中心线 (17, 3.5) C (17, 8.5) (15.5, 12.5) (12, 12.5)，左右对称；在高度 y 处按切线把中心线往里收半个线宽
function wall(y, h) {
  const at = (t, a, b, c, d) => (1 - t) ** 3 * a + 3 * (1 - t) ** 2 * t * b + 3 * (1 - t) * t * t * c + t ** 3 * d
  const slope = (t, a, b, c, d) => 3 * (1 - t) ** 2 * (b - a) + 6 * (1 - t) * t * (c - b) + 3 * t * t * (d - c)
  let [lo, hi] = [0, 1]
  for (let i = 0; i < 40; i++) {
    const m = (lo + hi) / 2
    if (at(m, 3.5, 8.5, 12.5, 12.5) < y)
      lo = m
    else
      hi = m
  }
  const [dx, dy] = [slope(lo, 17, 17, 15.5, 12), slope(lo, 3.5, 8.5, 12.5, 12.5)]
  return at(lo, 17, 17, 15.5, 12) - h * Math.hypot(dx, dy) / dy
}
function liquid(stroke) {
  const h = stroke / 2
  const [y0, y1] = [7.5 - h, 7.5 + h]
  const [x0, x1] = [wall(y0, h), wall(y1, h)]
  return `M${24 - x0} ${y0}H${x0}L${x1} ${y1}H${24 - x1}Z`
}
export const fill = ({ stroke }) => [
  solid('M7 3.5H17C17 8.5 15.5 12.5 12 12.5C8.5 12.5 7 8.5 7 3.5Z'),
  cutout(liquid(stroke)),
  'M12 12.5V20.5',
  'M8 20.5H16',
]
