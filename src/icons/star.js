import { star } from '../symbols'
import { solid } from '../solid'

// 收藏
export default ({ radius }) => star([12, 12], 2.4, radius)

export const fill = ({ radius }) => solid(star([12, 12], 2.4, radius))
