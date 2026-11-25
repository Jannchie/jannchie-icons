import { dot } from '../scene'
import { solid } from '../solid'

// 水龙头（装在墙上，侧视）：左边一道竖线是墙座（6.5–15.5）；从墙座伸出来的横管（8.5–12.5）到右边往下弯成出水口（15.5–19.5，口朝下在 14.5）；
// 横管上面一个 T 形的旋钮（立杆 9.5、横把 6.5–12.5 在 5.5）；出水口下面一滴水
const plate = 'M3.5 6.5V15.5'
const pipe = 'M3.5 8.5H14C17.25 8.5 19.5 10.5 19.5 14.5H15.5C15.5 13.25 14.75 12.5 13.5 12.5H3.5'
const knob = ['M9.5 8.5V5.5', 'M6.5 5.5H12.5']
const drop = { ...dot(17.5, 18.5, 2.5), round: true }

export default () => [plate, pipe, ...knob, drop]

// 实心：水管一块；墙座、旋钮照旧是线，水滴照旧是点
export const fill = () => [solid(`${pipe}Z`), plate, ...knob, drop]
