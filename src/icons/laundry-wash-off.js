import { LAUNDRY } from '../laundry'

// 洗涤标志：不可水洗
export default ({ radius }) => LAUNDRY['wash-off'].paths(radius)
