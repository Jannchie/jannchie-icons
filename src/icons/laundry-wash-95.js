import { LAUNDRY } from '../laundry'

// 洗涤标志：水洗 95℃
export default ({ radius }) => LAUNDRY['wash-95'].paths(radius)
