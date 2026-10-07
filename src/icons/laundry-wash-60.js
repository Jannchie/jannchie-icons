import { LAUNDRY } from '../laundry'

// 洗涤标志：水洗 60℃
export default ({ radius }) => LAUNDRY['wash-60'].paths(radius)
