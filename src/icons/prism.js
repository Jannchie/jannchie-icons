import { crisp, rounded, through } from '../geometry'
import { knock, solid } from '../solid'

// 棱镜（色散）：一块三棱镜（三角形，顶 (11, 5.5)，底边 5–17 在 17.5）+ 从左边射进来的一束光（落在左棱面上）+ 光在棱镜里走的一段（细节线）
// + 从右棱面散开的三道光（上下两道连成一笔、在出射点拐弯，中间一道从出射点接出去）
const IN = [8, 11.5] // 入射点（左棱面上）
const OUT = [14.5, 12.5] // 出射点（右棱面上）
const glass = radius => rounded([[11, 5.5, crisp(radius)], [17, 17.5], [5, 17.5]], Math.min(radius, 1))
const beam = `M2.5 13L${IN.join(' ')}`
const inside = { d: through(IN, OUT, 0), detail: true }
const fan = [`M21.5 10L${OUT.join(' ')}L21.5 16.5`, `M${OUT.join(' ')}L21.5 13.25`]

export default ({ radius }) => [glass(radius), beam, inside, ...fan]

// 实心：棱镜一块，镜里那段光两头都挖穿；镜外的光照旧是线
export const fill = ({ radius, stroke }) => [solid(glass(radius)), knock({ d: through(IN, OUT, stroke * 1.5), detail: true }), beam, ...fan]
