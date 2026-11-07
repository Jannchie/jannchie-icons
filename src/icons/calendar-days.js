import calendar from './calendar'
import { center, fillParts } from '../calendar'
import { centerFill } from '../solid'
import { dot } from '../scene'

// 日历 + 表格里六个日期点：3 列 × 2 行，间距 4，以格子区中心为中心
const [cx, cy] = center
const dots = () => [-4, 0, 4].flatMap(dx => [dot(cx + dx, cy - 2), dot(cx + dx, cy + 2)])
export default opts => [...calendar(opts), ...dots()]

// 实心：日期点从格子区里挖出来；尖角模式下也挖圆点（方点在粗字重下挤成一张格子网）
export const fill = ({ radius, stroke }) => centerFill(fillParts(radius, stroke), dots().map(d => ({ ...d, round: true })))
