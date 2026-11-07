import { crisp, rounded } from '../geometry'
import { arrow } from '../media'
import { knock, solid } from '../solid'
import { LID, trash } from '../trash'

// 从回收站恢复：垃圾桶 + 桶里向上的箭头，竖线在桶身中线 x 12 上，从 17.5 到 10.5
const up = radius => ['M12 17.5V10.5', rounded(arrow(12, 10.5, 'up', 2.5), crisp(radius), false)]

export default ({ radius, stroke }) => [
  ...trash(radius, stroke),
  ...up(radius),
]

// 实心：同 trash——桶身一块，和桶盖之间挖开一道缝，桶盖、提手照旧是线；箭头从桶身里挖空
export const fill = ({ radius, stroke }) => {
  const [lid, handle, bin] = trash(radius, stroke)
  return [
    solid(bin),
    knock(`M3 ${LID + stroke}H21`),
    lid,
    handle,
    knock(up(radius)),
  ]
}
