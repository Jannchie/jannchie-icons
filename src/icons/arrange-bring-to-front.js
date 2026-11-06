import { circle, crisp, rounded } from '../geometry'
import { solid } from '../solid'

// 置于顶层：最上面一层是框，下面两层是线
export default ({ radius, stroke }) => [
  rounded([[4.5, 3.5], [19.5, 3.5], [19.5, 10.5], [4.5, 10.5]], Math.min(radius, 1.5)),
  'M4.5 14.5H19.5',
  'M4.5 19.5H19.5',
]

// 实心：最上面那层的框填实，下面两层照旧是线
export const fill = ({ radius }) => [
  solid(rounded([[4.5, 3.5], [19.5, 3.5], [19.5, 10.5], [4.5, 10.5]], Math.min(radius, 1.5))),
  'M4.5 14.5H19.5',
  'M4.5 19.5H19.5',
]
