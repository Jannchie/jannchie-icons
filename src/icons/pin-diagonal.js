import { rounded } from '../geometry'
import { solid } from '../solid'
import { rotate } from '../transform'

// 图钉（倾斜）：和竖直的 pin 同一副形状（顶帽 + 收窄后张开的针座 + 针），先整体往针尖方向挪 1.5 再顺时针转 45°，针尖朝左下，像钉在板上
// 竖直的图钉顶帽宽、针细，重心偏上，直接转过去墨迹会往右上偏约 1；挪 1.5（≈ 1 × √2）后斜向居中
const cap = 'M8.5 5H15.5'
const seat = [[10, 5], [10, 10.5], [6.5, 15], [17.5, 15], [14, 10.5], [14, 5]]
const needle = 'M12 15V22.5'

export default ({ radius }) => [
  cap,
  rounded(seat, Math.min(radius, 1), false),
  needle,
].map(d => rotate(d, 45))

// 实心：针座一块，顶帽和针照旧是线（同 pin）
export const fill = ({ radius }) => [
  rotate(cap, 45),
  solid(rotate(rounded(seat, Math.min(radius, 1)), 45)),
  rotate(needle, 45),
]
