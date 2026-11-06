import { GAP } from '../clearance'
import { circle, crisp, rounded } from '../geometry'
import { clear, solid } from '../solid'

// 协作：两个并排的人
export default ({ radius, stroke }) => [
  circle(8, 8, 3),
  circle(16, 8, 3),
  'M2.5 19.5A5.5 5 0 0 1 13.5 19.5',
  'M10.5 19.5A5.5 5 0 0 1 21.5 19.5',
]

// 实心：两个人都是实心的头 + 肩；右边的人在前，左边的人在它四周让出缝（两人的头、肩挨得近，不让就粘成一团）
export const fill = () => {
  const front = [circle(16, 8, 3), 'M10.5 19.5A5.5 5 0 0 1 21.5 19.5Z']
  return [
    solid([circle(8, 8, 3), 'M2.5 19.5A5.5 5 0 0 1 13.5 19.5Z']),
    clear(front, GAP),
    solid(front),
  ]
}
