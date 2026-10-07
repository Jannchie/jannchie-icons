import { LAUNDRY } from '../laundry'

// 洗涤标志：低温转笼烘干
export default ({ radius }) => LAUNDRY['tumble-dry-low'].paths(radius)
