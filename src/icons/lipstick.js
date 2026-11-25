import { rounded } from '../geometry'
import { knock, solid } from '../solid'

// 口红：底下的管身（7.5–16.5 × 13.5–20.5）+ 管身上的一截套筒（9.5–14.5 × 9.5–13.5）+ 套筒里旋出来的膏体（顶面斜切，高的一侧在右，到 3.25）
// 套筒和膏体是一根立柱，中间一道横线分开
const tube = radius => rounded([[7.5, 13.5], [16.5, 13.5], [16.5, 20.5], [7.5, 20.5]], Math.min(radius, 1.5))
const column = 'M9.5 13.5V6.5L14.5 3.25V13.5'
const seam = 'M9.5 9.5H14.5'

export default ({ radius }) => [tube(radius), column, seam]

// 实心：管身、套筒、膏体各一块，两道接缝整条挖穿
export const fill = ({ radius }) => [
  solid([tube(radius), `${column}Z`]),
  knock(['M5 13.5H19', 'M7 9.5H17']),
]
