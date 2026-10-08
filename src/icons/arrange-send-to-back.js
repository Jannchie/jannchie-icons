import { circle, crisp, rounded } from '../geometry'

// 置于底层：最下面一层是框，上面两层是线
export default ({ radius, stroke }) => [
  'M4.5 4.5H19.5',
  'M4.5 9.5H19.5',
  rounded([[4.5, 14.5], [19.5, 14.5], [19.5, 20.5], [4.5, 20.5]], Math.min(radius, 1.5)),
]
