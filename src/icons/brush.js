import { rounded } from '../geometry'
import { knock, solid } from '../solid'
import { rotate } from '../transform'

// 画笔（平头）：细笔杆 + 金属箍 + 略微张开、底边平直的刷毛，先竖直画，再顺时针转 30°
export default ({ radius }) => [
  rotate(rounded([[11, 2.5], [13, 2.5], [13, 10.5], [11, 10.5]], 1), 30),
  rotate(rounded([[9.5, 10.5], [14.5, 10.5], [14.5, 13.5], [9.5, 13.5]], Math.min(radius, 1)), 30),
  rotate(rounded([[9.5, 13.5], [9, 20.5], [15, 20.5], [14.5, 13.5]], Math.min(radius, 1), false), 30),
]

// 实心：笔杆、金属箍、刷毛各一块，笔杆和箍之间挖开一道缝；箍和刷毛连成一块
export const fill = ({ radius }) => [
  solid([
    rotate(rounded([[11, 2.5], [13, 2.5], [13, 10.5], [11, 10.5]], 1), 30),
    rotate(rounded([[9.5, 10.5], [14.5, 10.5], [14.5, 13.5], [9.5, 13.5]], Math.min(radius, 1)), 30),
    rotate(rounded([[9.5, 13.5], [9, 20.5], [15, 20.5], [14.5, 13.5]], Math.min(radius, 1)), 30),
  ]),
  knock(rotate('M8 10.5H16', 30)),
]
