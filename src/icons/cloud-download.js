import { crisp, rounded } from '../geometry'
import { arrow } from '../media'
import { cloudOpen } from '../symbols'

// 云端下载：箭头两翼宽，会落在云底附近，干脆不画云底，只留上轮廓，箭头从下方伸出
export default ({ radius }) => [
  // 云和箭头整体右移半格，箭杆落在 12.5 上
  ...cloudOpen([12.5, 10.5], 2.6, Infinity),
  'M12.5 10V21',
  rounded(arrow(12.5, 21, 'down', 3), crisp(radius), false),
]
