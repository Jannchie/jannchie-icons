import { rounded } from '../geometry'
import { dot } from '../scene'

// 服务器：上下两台机箱，各带一个指示点；机箱高 6，中线落在 .5 上
export default ({ radius }) => [
  rounded([[3.5, 4.5], [20.5, 4.5], [20.5, 10.5], [3.5, 10.5]], Math.min(radius, 2)),
  rounded([[3.5, 13.5], [20.5, 13.5], [20.5, 19.5], [3.5, 19.5]], Math.min(radius, 2)),
  dot(7.5, 7.5),
  dot(7.5, 16.5),
  'M11.5 7.5H16.5',
  'M11.5 16.5H16.5',
]
