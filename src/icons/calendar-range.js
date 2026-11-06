import calendar from './calendar'
import { center, fillParts } from '../calendar'
import { centerFill } from '../solid'
import { rounded } from '../geometry'

// 日历 + 一段横跨多天的日程条（9 × 4，以格子区中心为中心：7.5–16.5 × 13.5–17.5，横竖边都在 .5 上）
const [cx, cy] = center
const bar = radius => rounded([[cx - 4.5, cy - 2], [cx + 4.5, cy - 2], [cx + 4.5, cy + 2], [cx - 4.5, cy + 2]], Math.min(radius, 1.5))
export default opts => [...calendar(opts), bar(opts.radius)]

// 实心：挖掉日程条的边框，条本身留成实心的一块
export const fill = ({ radius, stroke }) => centerFill(fillParts(radius, stroke), [bar(radius)])
