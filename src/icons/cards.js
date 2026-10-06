import { rounded } from '../geometry'
import { HEART } from '../suits'
import { scale } from '../transform'

// 两张扑克牌：后一张往左上错开（露出左边和上边），前一张牌面中间一颗红心
// 前一张牌是遮挡刀：后一张在交界处断开，被它盖住的部分整段删掉
export default ({ radius }) => [
  rounded([[4, 3], [15, 3], [15, 19], [4, 19]], Math.min(radius, 1.75)),
  { d: rounded([[9, 5], [20, 5], [20, 21], [9, 21]], Math.min(radius, 1.75)), cut: true, gap: 0.5, occlude: true },
  // 缩放中心按「红心中心 (12, 12.25) 缩 0.4 后落在牌面中心 (14.5, 13)」反推；红心也作为 cut，不会被前一张牌切断
  { d: scale(HEART, 0.4, [16.17, 13.5]), cut: true, gap: 0 },
]
