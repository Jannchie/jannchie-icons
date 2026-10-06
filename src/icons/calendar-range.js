import calendar from './calendar'
import { rounded } from '../geometry'

// 日历 + 一段横跨多天的日程条
export default opts => [...calendar(opts), rounded([[7, 13.5], [17, 13.5], [17, 17], [7, 17]], Math.min(opts.radius, 1.75))]
