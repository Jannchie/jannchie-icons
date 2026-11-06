import { rounded } from '../geometry'
import { knock, solid } from '../solid'

// 九宫格：外框 + 两横两竖；外框 3–21（边长 18、每格 6），居中
export default ({ radius }) => [
  rounded([[3, 3], [21, 3], [21, 21], [3, 21]], Math.min(radius, 2.5)),
  'M9 3V21',
  'M15 3V21',
  'M3 9H21',
  'M3 15H21',
]

// 实心：外框一块，挖掉两横两竖；四条线两头各缩一个线宽，九格靠外框连成一块
export const fill = ({ radius, stroke }) => {
  const [a, b] = [3 + stroke, 21 - stroke]
  return [
    solid(rounded([[3, 3], [21, 3], [21, 21], [3, 21]], Math.min(radius, 2.5))),
    knock([`M9 ${a}V${b}`, `M15 ${a}V${b}`, `M${a} 9H${b}`, `M${a} 15H${b}`]),
  ]
}
