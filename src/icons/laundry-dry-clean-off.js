import { LAUNDRY } from '../laundry'

// 洗涤标志：不可干洗
export default ({ radius }) => LAUNDRY['dry-clean-off'].paths(radius)
