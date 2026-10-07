import { LAUNDRY } from '../laundry'

// 洗涤标志：高温转笼烘干
export default ({ radius }) => LAUNDRY['tumble-dry-high'].paths(radius)
