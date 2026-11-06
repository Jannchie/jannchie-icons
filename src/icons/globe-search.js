import { GAP } from '../clearance'
import { circle } from '../geometry'
import { clear, knock, solid } from '../solid'
import { cornerScale, search, searchCut } from '../symbols'
import globe from './globe'
import { info } from '../tone'

// 网络搜索：地球 + 右下角放大镜；地球线在放大镜附近断开，镜片内部留空
export default ({ radius }) => [
  ...globe(),
  ...info(searchCut([18.25, 18.25], cornerScale.search, radius)),
]

// 实心：地球一块，经线、赤道、纬线挖空，再把外圈画回去（挖空的线都落在外圈上，不画回去外圈会被切断）；
// 在放大镜四周让出缝（镜片连内部一起让），放大镜照旧是线
export const fill = ({ radius }) => {
  const [ring, ...lines] = globe()
  const lens = info(search([18.25, 18.25], cornerScale.search, radius))
  return [solid(ring), knock(lines), ring, clear(lens, GAP), ...lens]
}
