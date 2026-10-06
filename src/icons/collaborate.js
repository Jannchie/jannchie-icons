import { circle, crisp, rounded } from '../geometry'

// 协作：两个并排的人
export default ({ radius, stroke }) => [
  circle(8, 8, 3),
  circle(16, 8, 3),
  'M2.5 19.5A5.5 5 0 0 1 13.5 19.5',
  'M10.5 19.5A5.5 5 0 0 1 21.5 19.5',
]
