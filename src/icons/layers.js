import { rounded } from '../geometry'
import { solid } from '../solid'

// 图层：30° 菱形 + 下方两层折线
export default ({ radius }) => [
  rounded([[12, 2.8], [21, 8], [12, 13.2], [3, 8]], Math.min(radius, 1)),
  'M3 11.5L12 16.7L21 11.5',
  'M3 15L12 20.2L21 15',
]

// 实心：最上面一层菱形填实，下面两层折线照旧是线
export const fill = ({ radius }) => [
  solid(rounded([[12, 2.8], [21, 8], [12, 13.2], [3, 8]], Math.min(radius, 1))),
  'M3 11.5L12 16.7L21 11.5',
  'M3 15L12 20.2L21 15',
]
