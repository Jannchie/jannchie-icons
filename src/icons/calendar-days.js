import calendar from './calendar'
import { center } from '../calendar'
import { dot } from '../scene'

// 日历 + 表格里六个日期点：3 列 × 2 行，间距 4，以格子区中心为中心
const [cx, cy] = center
export default opts => [...calendar(opts), ...[-4, 0, 4].flatMap(dx => [dot(cx + dx, cy - 2), dot(cx + dx, cy + 2)])]
