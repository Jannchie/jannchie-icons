import { crisp, rounded } from '../geometry'
import { dot } from '../scene'
import { rotate } from '../transform'

// 钢笔：笔杆 + 笔尖（中间一道笔缝和一个通气孔），先竖直画，再顺时针转 30°
const [hx, hy] = (() => {
  const a = 30 * Math.PI / 180
  const [x, y] = [12 - 12, 14.5 - 12]
  return [12 + x * Math.cos(a) - y * Math.sin(a), 12 + x * Math.sin(a) + y * Math.cos(a)]
})()

export default ({ radius }) => [
  rotate(rounded([[9.5, 3], [14.5, 3], [14.5, 11.5], [9.5, 11.5]], Math.min(radius, 1)), 30),
  rotate(rounded([[9.5, 11.5], [14.5, 11.5], [12, 21, crisp(radius)]], Math.min(radius, 1)), 30),
  rotate('M12 16.25L12 20', 30),
  dot(hx, hy, 1.5),
]
