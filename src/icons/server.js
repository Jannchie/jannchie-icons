import { rounded } from '../geometry'
import { dot } from '../scene'
import { knock, solid } from '../solid'

// 服务器：上下两台机箱，各带一个指示点；机箱高 6，中线落在 .5 上
export default ({ radius }) => [
  rounded([[3.5, 4.5], [20.5, 4.5], [20.5, 10.5], [3.5, 10.5]], Math.min(radius, 2)),
  rounded([[3.5, 13.5], [20.5, 13.5], [20.5, 19.5], [3.5, 19.5]], Math.min(radius, 2)),
  dot(7.5, 7.5),
  dot(7.5, 16.5),
  'M11.5 7.5H16.5',
  'M11.5 16.5H16.5',
]

// 实心：两台机箱各一块，挖掉指示点和横线（横线两端离机箱边还有一段，不切断机箱）
export const fill = ({ radius }) => [
  solid(rounded([[3.5, 4.5], [20.5, 4.5], [20.5, 10.5], [3.5, 10.5]], Math.min(radius, 2))),
  solid(rounded([[3.5, 13.5], [20.5, 13.5], [20.5, 19.5], [3.5, 19.5]], Math.min(radius, 2))),
  knock([dot(7.5, 7.5), dot(7.5, 16.5), 'M11.5 7.5H16.5', 'M11.5 16.5H16.5']),
]
