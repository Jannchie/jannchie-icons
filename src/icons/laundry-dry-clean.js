import { LAUNDRY } from '../laundry'

// 洗涤标志：可干洗
export default ({ radius }) => LAUNDRY['dry-clean'].paths(radius)
