import { dpad } from '../controller'
import { solid } from '../solid'

// 十字键
export default ({ radius, stroke }) => [
  dpad(radius, stroke),
]

// 实心：十字整块填实
export const fill = ({ radius, stroke }) => [solid(dpad(radius, stroke))]
