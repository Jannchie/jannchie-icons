import { off, offFill } from '../off'
import { groundLine } from '../scene'
import base, { fill as baseFill } from './home'

// 划掉的住宅
export default off(base)

// 实心：住宅的实心版在斜线两侧让出缝，再画斜线；地平线右端收到 20：斜线的缝只把它切到 22 左右，
// 原长 21.5 的话粗字重下缝外还剩一粒三角形的碎墨
export const fill = offFill(opts => baseFill(opts).map(p => (p === groundLine ? 'M2.5 20.5H20' : p)))
