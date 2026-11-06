import { rounded } from '../geometry'
import { ring } from '../marks'
import { hole, solid } from '../solid'

// 圆圈停止键：圆 + 居中的方块（9.5–14.5，四边落在 .5 上）
const box = [[9.5, 9.5], [14.5, 9.5], [14.5, 14.5], [9.5, 14.5]]
export default ({ radius }) => [ring(), rounded(box, Math.min(radius, 1))]

// 实心：圆片上挖出方块
export const fill = ({ radius }) => [solid(ring()), hole(rounded(box, Math.min(radius, 1)))]
