import { crisp, rounded } from '../geometry'
import { arrow } from '../media'
import { cloudOpen } from '../symbols'

// 云端下载：箭头两翼宽，会落在云底附近，干脆不画云底，只留上轮廓，箭头从下方伸出
export default ({ radius }) => [
  ...cloudOpen([12, 10.5], 2.6, Infinity),
  'M12 10V21',
  rounded(arrow(12, 21, 'down', 3), crisp(radius), false),
]
