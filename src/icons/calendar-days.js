import calendar from './calendar'
import { dot } from '../scene'

// 日历 + 表格里六个日期点
export default opts => [...calendar(opts), ...[8, 12, 16].flatMap(x => [dot(x, 13.5), dot(x, 17)])]
