import { GAP } from '../clearance'
import { clear, knock, solid } from '../solid'
import { cornerScale, search, searchCut } from '../symbols'
import map from './map'
import { info } from '../tone'

// 在地图中搜索：地图 + 右下角放大镜；地图线在放大镜附近断开，镜片内部留空
export default ({ radius }) => [
  ...map({ radius }),
  ...info(searchCut([18.25, 18.25], cornerScale.search, radius)),
]

// 实心：地图填实，两道折痕挖开成三折；在放大镜四周让出缝（镜片连内部一起让），放大镜照旧是线
export const fill = ({ radius, stroke }) => {
  const [sheet, ...creases] = map({ radius, stroke })
  const lens = info(search([18.25, 18.25], cornerScale.search, radius))
  return [solid(sheet), knock(creases), clear(lens, GAP), ...lens]
}
