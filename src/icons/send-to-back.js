import { circle, crisp, rounded } from '../geometry'

// 置于底层：最下面一层是框，上面两层是线
export default ({ radius, stroke }) => [
  'M4 4.5H20',
  'M4 9.5H20',
  rounded([[4, 14], [20, 14], [20, 20.5], [4, 20.5]], Math.min(radius, 1.5)),
]
