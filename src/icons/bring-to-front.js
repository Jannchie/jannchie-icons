import { circle, crisp, rounded } from '../geometry'

// 置于顶层：最上面一层是框，下面两层是线
export default ({ radius, stroke }) => [
  rounded([[4, 3.5], [20, 3.5], [20, 10], [4, 10]], Math.min(radius, 1.5)),
  'M4 14.5H20',
  'M4 19.5H20',
]
