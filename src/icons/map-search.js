import { cornerScale, searchCut } from '../symbols'
import map from './map'
import { info } from '../tone'

// 在地图中搜索：地图 + 右下角放大镜；地图线在放大镜附近断开，镜片内部留空
export default ({ radius }) => [
  ...map({ radius }),
  ...info(searchCut([18.25, 18.25], cornerScale.search, radius)),
]
