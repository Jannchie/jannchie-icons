import { rounded } from '../geometry'
import { eye } from '../scene'
import { stacked } from '../solid'

// 喷雾瓶（扳机式喷壶，侧视、喷嘴朝右）：溜肩的瓶身（4.5–13.5 × 13.5–20.5，瓶颈 7.5–10.5 升到喷头底下 8.5）+ 瓶颈上面的喷头（5.5–14.5 × 4.5–8.5，后背斜着）
// + 喷头前端伸出去的喷嘴（短横线，到 16.5）+ 喷头底下往前弯的扳机 + 喷嘴前面散开的三颗雾点
// 靠「扳机 + 喷嘴前的雾点」认出来；pump-bottle 是竖直的泵杆、往下弯的出液口，没有扳机和雾点
const bottle = radius => rounded([[7.5, 8.5], [7.5, 10.5], [4.5, 13.5], [4.5, 20.5], [13.5, 20.5], [13.5, 13.5], [10.5, 10.5], [10.5, 8.5]], Math.min(radius, 1.5), false)
const head = radius => rounded([[7.5, 4.5], [14.5, 4.5], [14.5, 8.5], [5.5, 8.5]], Math.min(radius, 1))
const nozzle = 'M14.5 6.5H16.5'
const trigger = 'M13 8.5C13 10 14 11 16 11.25'
const mist = [eye(19.5, 3.5, 1.5), eye(20.5, 6.5, 1.5), eye(19.5, 9.5, 1.5)]

export default ({ radius }) => [bottle(radius), head(radius), nozzle, trigger, ...mist]

// 实心：瓶身（连瓶颈）一块，喷头一块叠在前面，瓶颈在喷头底下让出缝；喷嘴、扳机、雾点照旧
export const fill = ({ radius }) => [...stacked(`${bottle(radius)}Z`, head(radius)), nozzle, trigger, ...mist]
