import { cornerScale, searchCut } from '../symbols'
import globe from './globe'

// 网络搜索：地球 + 右下角放大镜；地球线在放大镜附近断开，镜片内部留空
export default ({ radius }) => [
  ...globe(),
  ...searchCut([18.25, 18.25], cornerScale.search, radius),
]
