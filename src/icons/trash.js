import { LID, trash } from '../trash'
import { knock, solid } from '../solid'

// 删除：垃圾桶 + 桶身里两道竖线（10 / 14，和中线对称）
export default ({ radius, stroke }) => [
  ...trash(radius, stroke),
  'M10 10.5V17.5',
  'M14 10.5V17.5',
]

// 实心：桶身一块，和桶盖之间挖开一道缝，桶身里的两道竖线挖空；桶盖、提手照旧是线
export const fill = ({ radius, stroke }) => {
  const [lid, handle, bin] = trash(radius, stroke)
  return [
    solid(bin),
    knock(`M3 ${LID + stroke}H21`),
    lid,
    handle,
    knock(['M10 10.5V17.5', 'M14 10.5V17.5']),
  ]
}
