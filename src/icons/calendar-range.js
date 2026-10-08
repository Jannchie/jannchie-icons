import calendar from './calendar'
import { center } from '../calendar'
import { rounded } from '../geometry'

// 日历 + 一段横跨多天的日程条（9 × 4，以格子区中心为中心：7.5–16.5 × 13.5–17.5，横竖边都在 .5 上）
const [cx, cy] = center
export default opts => [...calendar(opts), rounded([[cx - 4.5, cy - 2], [cx + 4.5, cy - 2], [cx + 4.5, cy + 2], [cx - 4.5, cy + 2]], Math.min(opts.radius, 1.5))]
