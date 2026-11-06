import { fillParts, plain } from '../shield'
import { plainFill } from '../solid'

// 盾
export default ({ stroke }) => plain(stroke)

export const fill = ({ radius, stroke }) => plainFill(fillParts(radius, stroke))
