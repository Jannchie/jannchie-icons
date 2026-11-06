import { GAP } from '../clearance'
import { circle } from '../geometry'
import { clear, solid } from '../solid'

// 葡萄：三二一排成倒三角的六颗 + 果梗（果梗在中线 12 上）
export default ({ radius }) => [
  circle(7.5, 9, 2.1),
  circle(12, 9, 2.1),
  circle(16.5, 9, 2.1),
  circle(9.75, 13, 2.1),
  circle(14.25, 13, 2.1),
  circle(12, 17, 2.1),
  'M12 6.9V3',
  'M12 4.5C13 3.5 14.5 3.25 16 3.75',
]

// 实心：六颗葡萄都是实心圆，从上往下一颗颗叠，后画的在四周让出缝，颗粒才分得开；果梗照旧是线
export const fill = () => {
  const grapes = [[7.5, 9], [12, 9], [16.5, 9], [9.75, 13], [14.25, 13], [12, 17]].map(([x, y]) => circle(x, y, 2.1))
  return [
    ...grapes.flatMap((g, i) => (i ? [clear(g, GAP), solid(g)] : [solid(g)])),
    'M12 6.9V3',
    'M12 4.5C13 3.5 14.5 3.25 16 3.75',
  ]
}
