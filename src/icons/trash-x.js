import { knock, solid } from '../solid'
import { cross } from '../symbols'
import { LID, trash } from '../trash'

// 彻底删除：垃圾桶 + 桶里一个叉（中心在桶身内部的中点 (12, 14)）
export default ({ radius, stroke }) => [
  ...trash(radius, stroke),
  ...cross([12, 14], 1.1, radius),
]

// 实心：同 trash——桶身一块，和桶盖之间挖开一道缝，桶盖、提手照旧是线；叉从桶身里挖空
export const fill = ({ radius, stroke }) => {
  const [lid, handle, bin] = trash(radius, stroke)
  return [
    solid(bin),
    knock(`M3 ${LID + stroke}H21`),
    lid,
    handle,
    knock(cross([12, 14], 1.1, radius)),
  ]
}
