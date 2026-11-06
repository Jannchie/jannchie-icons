import { crisp, rounded } from '../geometry'
import { solid } from '../solid'

// 皇冠：三个尖的王冠（中间最高）+ 下方一道箍
export default ({ radius }) => [
  rounded([[4, 17.5], [2.75, 7], [8, 11.5], [12, 4.5], [16, 11.5], [21.25, 7], [20, 17.5]], crisp(radius)),
  'M4.5 20.5H19.5',
]

// 实心：冠身一块，下方的箍照旧是线
export const fill = ({ radius }) => [
  solid(rounded([[4, 17.5], [2.75, 7], [8, 11.5], [12, 4.5], [16, 11.5], [21.25, 7], [20, 17.5]], crisp(radius))),
  'M4.5 20.5H19.5',
]
