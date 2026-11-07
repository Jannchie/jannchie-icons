import { badgeFill } from '../solid'
import { cornerScale, search, searchCut } from '../symbols'
import { info } from '../tone'
import map, { fill as mapFill } from './map'

// 在地图中搜索：地图 + 右下角放大镜；地图线在放大镜附近断开，镜片内部留空
export default ({ radius }) => [
  ...map({ radius }),
  ...info(searchCut([18.25, 18.25], cornerScale.search, radius)),
]

// 实心：地图的实心版（三折，见 map.js），放大镜按角标处理（见 solid.js 的 badgeFill）：四周让出一圈缝（不在方角上，不朝外角让），放大镜照旧是线
export const fill = ({ radius }) => badgeFill({ body: mapFill({ radius }), lines: [] }, info(search([18.25, 18.25], cornerScale.search, radius)))
