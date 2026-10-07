import { LAUNDRY } from '../laundry'

// 洗涤标志：不可转笼烘干
export default ({ radius }) => LAUNDRY['tumble-dry-off'].paths(radius)
