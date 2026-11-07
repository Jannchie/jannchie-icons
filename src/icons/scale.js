import { crisp, rounded } from '../geometry'
import { knock, solid } from '../solid'

// 缩放 / 分辨率：外框 + 左下角小框 + 指向右上的 45° 箭头
export default ({ radius }) => [
  rounded([[3.5, 3.5], [20.5, 3.5], [20.5, 20.5], [3.5, 20.5]], Math.min(radius, 2.5)),
  rounded([[3.5, 13.5], [10.5, 13.5], [10.5, 20.5]], Math.min(radius, 1), false),
  'M13.5 10.5L17.5 6.5',
  rounded([[14.5, 6.5], [17.5, 6.5], [17.5, 9.5]], crisp(radius), false),
]

// 实心：外框一块，挖掉左下小框的边线和箭头。小框的两条边穿出外框的左边、底边（停在外框中线上的线帽只擦到外缘，留一道细桥），
// 小框自成一块；箭杆停在箭头折角里面（描边版由 finalize 把箭杆缩进尖角，实心版不缩，尖角模式下方头会从折角外戳出一个尖）
export const fill = ({ radius }) => [
  solid(rounded([[3.5, 3.5], [20.5, 3.5], [20.5, 20.5], [3.5, 20.5]], Math.min(radius, 2.5))),
  knock([
    rounded([[0, 13.5], [10.5, 13.5], [10.5, 24]], Math.min(radius, 1), false),
    'M13.5 10.5L16.75 7.25',
    rounded([[14.5, 6.5], [17.5, 6.5], [17.5, 9.5]], crisp(radius), false),
  ]),
]
