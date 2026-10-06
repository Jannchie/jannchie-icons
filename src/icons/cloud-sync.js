import { crisp, rounded } from '../geometry'
import { cloud } from '../symbols'

// 云端同步：云里两根竖直箭头，左上右下，各只有朝外的半边 45° 箭翼
const [top, bottom, wing] = [9, 16, 2]

export default ({ radius }) => [
  ...cloud([12, 12], 2.6),
  rounded([[10.5, bottom], [10.5, top], [10.5 - wing, top + wing]], crisp(radius), false),
  rounded([[13.5, top], [13.5, bottom], [13.5 + wing, bottom - wing]], crisp(radius), false),
]
