import { crisp, rounded } from '../geometry'
import { cloud } from '../symbols'

// 云端同步：云里两根竖直箭头，左上右下，各只有朝外的半边 45° 箭翼
// 云顶最低处约在 y 8.45（线的内缘）：箭头上端放在 11、下端 16，上下都离云的线留开 1.5 以上
const [top, bottom, wing] = [11, 16, 2]

export default ({ radius }) => [
  ...cloud([12, 12], 2.6),
  rounded([[10.5, bottom], [10.5, top], [10.5 - wing, top + wing]], crisp(radius), false),
  rounded([[13.5, top], [13.5, bottom], [13.5 + wing, bottom - wing]], crisp(radius), false),
]
