import { circle } from '../geometry'
import { info } from '../tone'
import { BADGE, withPaths } from '../user'

const [x, y] = BADGE

// 兼职：人像 + 右下角半个时钟（闭合的圆 + 左半边填实的半圆，表示只占一半时间）
const badge = [`${circle(x, y, 3.5)}Z`, { d: `M${x} ${y - 3.5}A3.5 3.5 0 0 0 ${x} ${y + 3.5}Z`, fill: true }]
export default () => withPaths(badge, info)

// 实心：人像填实，角标四周挖出圆形的缝，角标照旧是线
export const fill = () => withPaths(badge, info, { fill: true })
