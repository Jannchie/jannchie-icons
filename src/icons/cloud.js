import { solid } from '../solid'
import { cloud } from '../symbols'

// 云
export default ({ radius }) => cloud([12, 12], 2.6, radius)

// 实心：整朵云
export const fill = ({ radius }) => solid(cloud([12, 12], 2.6, radius))
