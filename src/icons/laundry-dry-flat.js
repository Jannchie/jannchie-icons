import { LAUNDRY } from '../laundry'

// 洗涤标志：平摊晾干
export default ({ radius }) => LAUNDRY['dry-flat'].paths(radius)
