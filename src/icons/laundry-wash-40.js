import { LAUNDRY } from '../laundry'

// 洗涤标志：水洗 40℃
export default ({ radius }) => LAUNDRY['wash-40'].paths(radius)
