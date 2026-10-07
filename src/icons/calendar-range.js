import calendar from './calendar'
import { rounded } from '../geometry'

// 日历 + 一段横跨多天的日程条（7.5–16.5 × 13.5–16.5，在格子里居中）
export default opts => [...calendar(opts), rounded([[7.5, 13.5], [16.5, 13.5], [16.5, 16.5], [7.5, 16.5]], Math.min(opts.radius, 1.5))]
