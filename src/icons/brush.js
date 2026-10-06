import { rounded } from '../geometry'
import { rotate } from '../transform'

// 画笔（平头）：细笔杆 + 金属箍 + 略微张开、底边平直的刷毛，先竖直画，再顺时针转 30°
export default ({ radius }) => [
  rotate(rounded([[11, 2.5], [13, 2.5], [13, 10.5], [11, 10.5]], 1), 30),
  rotate(rounded([[9.5, 10.5], [14.5, 10.5], [14.5, 13.5], [9.5, 13.5]], Math.min(radius, 1)), 30),
  rotate(rounded([[9.5, 13.5], [9, 20.5], [15, 20.5], [14.5, 13.5]], Math.min(radius, 1), false), 30),
]
