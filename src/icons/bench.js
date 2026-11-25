import { rounded } from '../geometry'
import { solid } from '../solid'

// 长椅（公园长椅，正面）：上面一块靠背板（4.5–19.5 × 5.5–9.5）+ 下面一块两头伸出去的座板（3.5–20.5 × 12.5–15.5）
// + 两根立柱（6.5 / 17.5）：靠背和座板之间一段，座板底下一段是椅腿（落到 20.5）
const back = radius => rounded([[4.5, 5.5], [19.5, 5.5], [19.5, 9.5], [4.5, 9.5]], Math.min(radius, 1.5))
const seat = radius => rounded([[3.5, 12.5], [20.5, 12.5], [20.5, 15.5], [3.5, 15.5]], Math.min(radius, 1.5))
const posts = ['M6.5 9.5V12.5', 'M17.5 9.5V12.5', 'M6.5 15.5V20.5', 'M17.5 15.5V20.5']

export default ({ radius }) => [back(radius), seat(radius), ...posts]

// 实心：靠背板、座板各一块；立柱和椅腿照旧是线
export const fill = ({ radius }) => [solid([back(radius), seat(radius)]), ...posts]
