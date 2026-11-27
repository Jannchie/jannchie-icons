import { rounded } from '../geometry'
import { solid } from '../solid'

// 凳子（吧台凳，正面）：顶上一块厚厚的圆垫凳面（5.5–18.5 × 3.5–7.5）+ 两条往外撇的长腿（从凳面底下 8.5 / 15.5 撇到 6.5 / 17.5，落到 20.5）
// + 两腿之间一道脚踏横档（14.5，两端落在腿上：x = 7.42 / 16.58）
// 靠「没有靠背 + 高腿 + 脚踏」认出来；chair 是侧视的、带靠背
const seat = radius => rounded([[5.5, 3.5], [18.5, 3.5], [18.5, 7.5], [5.5, 7.5]], Math.min(radius, 2))
const legs = ['M8.5 7.5L6.5 20.5', 'M15.5 7.5L17.5 20.5', 'M7.42 14.5H16.58']

export default ({ radius }) => [seat(radius), ...legs]

// 实心：凳面一块；凳腿和脚踏照旧是线
export const fill = ({ radius }) => [solid(seat(radius)), ...legs]
